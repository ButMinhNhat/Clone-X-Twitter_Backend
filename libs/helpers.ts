import {
	MicroserviceOptions,
	RpcException,
	Transport
} from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'
import { Logger, Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { execSync } from 'child_process'

import { GraphQLExceptionFilter } from './exceptionFilter'
import { DatabaseConnection } from './database'

export const ports = {
	GATEWAY: {
		port: 8080,
		name: 'Gateway'
	},
	USER: {
		port: 8081,
		name: 'User Service',
		database: 'test_database'
	}
}

export const generateBoostrap = async (
	moduleName: string,
	listModules: any[]
) => {
	const { port, name, database } = ports[moduleName]
	if (!port) process.exit(1)

	// kill port before running
	try {
		const pid = execSync(`netstat -ano | findstr :${port}`)
			.toString()
			.trim()
			.split(/\s+/)[4]
		if (pid) execSync(`taskkill /PID ${pid} /F`)
	} catch {}

	// generate app with database
	@Module({ imports: [DatabaseConnection(database), ...listModules] })
	class AppModule {}

	// generate microservices
	const logger = new Logger(name)
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{ transport: Transport.TCP, options: { port } }
	)
	app.useGlobalFilters(new GraphQLExceptionFilter())

	// run app
	try {
		await app.listen()
		logger.log(`🚀 ${name} is running on port ${port}`)
	} catch (error) {
		logger.error(`❌ ${name} started failed!`, error)
	}
}

export const wrapResolvers = (rpcCall: Observable<any>) => {
	try {
		return firstValueFrom(rpcCall)
	} catch (error) {
		throw new RpcException(error.message || 'Internal Server Error')
	}
}
