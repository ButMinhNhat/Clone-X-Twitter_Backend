import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql'
import { Catch, ArgumentsHost, Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
	private readonly logger = new Logger(GraphQLExceptionFilter.name)

	catch(exception: any, host: ArgumentsHost) {
		const gqlHost = GqlArgumentsHost.create(host)

		if (exception instanceof RpcException) {
			const errorResponse = exception.getError()
			this.logger.error(`Microservice Error: ${JSON.stringify(errorResponse)}`)

			return new Error(errorResponse['message'] || 'Internal Server Error')
		}

		this.logger.error(`GraphQL Error: ${JSON.stringify(exception)}`)
		return exception
	}
}
