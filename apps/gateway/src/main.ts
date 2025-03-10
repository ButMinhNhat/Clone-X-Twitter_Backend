import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'

import { Gateway } from './gateway'

async function bootstrap() {
	const app = await NestFactory.create(Gateway)
	const logger = new Logger('')
	const port = 8080

	try {
		await app.listen(port)
		logger.log('✅ Database connected successfully!')
		logger.log(`(🚀 Server has started on http://localhost:${port}/graphql`)
	} catch (error) {
		logger.error('❌ Database connection failed!', error)
	}
}
bootstrap()
