import {
	InternalServerErrorException,
	UnauthorizedException,
	BadRequestException,
	ForbiddenException,
	NotFoundException,
	ExceptionFilter,
	ArgumentsHost,
	HttpException,
	HttpStatus,
	Logger,
	Catch
} from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { GqlExceptionFilter } from '@nestjs/graphql'
import { QueryFailedError } from 'typeorm'

const NestJsHttpExceptionMap = {
	400: BadRequestException,
	401: UnauthorizedException,
	403: ForbiddenException,
	404: NotFoundException,
	500: InternalServerErrorException
}

@Catch()
export class ServiceExceptionFilter implements ExceptionFilter {
	private readonly logger: Logger = new Logger(ServiceExceptionFilter.name)
	private readonly serviceName: string

	constructor(serviceName: string) {
		this.serviceName = serviceName
	}

	catch(exception: any, host: ArgumentsHost) {
		const defaultError = {
			message: 'Error occurred!',
			status: HttpStatus.INTERNAL_SERVER_ERROR
		}

		// HTTP errors
		if (exception instanceof HttpException) {
			const errorResponse = exception.getResponse()
			defaultError.message = errorResponse['message']
			defaultError.status = errorResponse['statusCode']
		}

		// Database errors
		if (exception instanceof QueryFailedError) {
			defaultError.message = exception.message
		}

		this.logger.error(`${this.serviceName} error: ${defaultError.message}`)
		return new RpcException(defaultError)
	}
}

@Catch(RpcException)
export class GatewayExceptionFilter implements GqlExceptionFilter {
	private readonly logger = new Logger(GatewayExceptionFilter.name)

	catch(exception: any, host: ArgumentsHost) {
		const errorResponse = exception.getError() || {}
		const { message, statusCode } = errorResponse

		this.logger.error(`Gateway error: ${JSON.stringify(errorResponse)}`)

		const ExceptionClass =
			NestJsHttpExceptionMap[statusCode] || InternalServerErrorException
		return new ExceptionClass(message)
	}
}
