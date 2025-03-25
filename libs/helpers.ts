import {
	MicroserviceOptions,
	RpcException,
	Transport
} from '@nestjs/microservices'
import { Logger, Module } from '@nestjs/common'
import { firstValueFrom, Observable } from 'rxjs'
import { NestFactory } from '@nestjs/core'
import { execSync } from 'child_process'

import {
	GatewayExceptionFilter,
	ServiceExceptionFilter
} from './exceptionFilter'
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
				gatewayApp.useGlobalFilters(new GatewayExceptionFilter())

				// run app
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
				app.useGlobalFilters(new ServiceExceptionFilter(name))

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

	// Error handler
	if (res.error) throw new RpcException(JSON.parse(res.error.message))

	// Success
	return res
}
