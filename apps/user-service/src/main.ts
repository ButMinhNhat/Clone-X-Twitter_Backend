import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { execSync } from 'child_process'
import { Logger } from '@nestjs/common'

import { UserModule } from './user.module'

const killPort = (port: number) => {
	if (!port) process.exit(1)

	try {
		const pid = execSync(`netstat -ano | findstr :${port}`)
			.toString()
			.trim()
			.split(/\s+/)[4]
		if (pid) execSync(`taskkill /PID ${pid} /F`)
	} catch (error) {}
}

async function bootstrap() {
	const port = 8081
	killPort(port)

	const logger = new Logger('User Service')
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		UserModule,
		{ transport: Transport.TCP, options: { port } }
	)

	try {
		await app.listen()
		logger.log('✅ Database connected successfully!')
		logger.log(`🚀 User service is running on port ${port}`)
	} catch (error) {
		logger.error('❌ Database connection failed!', error)
	}
}
bootstrap()
