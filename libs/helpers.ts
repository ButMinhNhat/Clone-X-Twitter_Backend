import {
	InternalServerErrorException,
	BadGatewayException,
	BadRequestException,
	NotFoundException,
	HttpStatus,
	Logger,
	Module
} from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import { NestFactory } from '@nestjs/core'
import { execSync } from 'child_process'

import { GraphQLExceptionFilter } from './exceptionFilter'
import { servicePorts } from './constants.global'
import { DatabaseConnection } from './database'

export const generateBoostrap = async (
	moduleName: string,
	listModules: any[]
) => {
	const { port, name, database } = servicePorts[moduleName]
	if (!port) process.exit(1)

	// kill port before running
	try {
		const pid = execSync(`netstat -ano | findstr :${port}`)
			.toString()
			.trim()
			.split(/\s+/)[4]
		if (pid) execSync(`taskkill /PID ${pid} /F`)
	} catch {}

	// generate app
	const logger = new Logger(name)
	switch (moduleName) {
		case 'GATEWAY':
			try {
				// generate and run app
				const gatewayApp = await NestFactory.create(listModules[0])
				await gatewayApp.listen(port)

				logger.log(`✅ Gateway has started on http://localhost:${port}/graphql`)
			} catch (error) {
				logger.error(`❌ Gateway started failed!`, error)
			}
			break

		default:
			// connect database
			@Module({ imports: [DatabaseConnection(database), ...listModules] })
			class AppModule {}

			try {
				// generate microservices
				const app = await NestFactory.createMicroservice<MicroserviceOptions>(
					AppModule,
					{ transport: Transport.TCP, options: { port } }
				)
				app.useGlobalFilters(new GraphQLExceptionFilter())

				// run app
				await app.listen()
				logger.log(`✅ ${name} is running on port ${port}`)
			} catch (error) {
				logger.error(`❌ ${name} started failed!`, error)
			}
			break
	}
}

export const wrapResolvers = async (rpcCall: Observable<any>) => {
	const res = await firstValueFrom(rpcCall)

	// HTTP errors
	switch (res.status) {
		case HttpStatus.BAD_REQUEST:
			throw new BadRequestException(res.message)

		case HttpStatus.NOT_FOUND:
			throw new NotFoundException(res.message)

		case HttpStatus.INTERNAL_SERVER_ERROR:
			throw new InternalServerErrorException(res.message)

		case HttpStatus.BAD_GATEWAY:
			throw new BadGatewayException(res.message)
	}

	// SQL errors
	if (
		res.severity === 'ERROR' &&
		['23502', '23505', '22P02'].includes(res.code)
	)
		throw new BadRequestException(res.detail)

	// Success
	return res
}
