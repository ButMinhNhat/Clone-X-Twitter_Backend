import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'

import { UserModule } from './user.module'

async function bootstrap() {
	const port = 8081
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		UserModule,
		{ transport: Transport.TCP, options: { port } }
	)
	await app.listen()

	const logger = new Logger('User Service')
	logger.log(`🚀 User service is running on port ${port}`)
}
bootstrap()
