import { NestFactory } from '@nestjs/core'
import { execSync } from 'child_process'
import { Logger } from '@nestjs/common'

import { Gateway } from './gateway'

const port = 8080
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
	killPort(port)

	const app = await NestFactory.create(Gateway)
	const logger = new Logger('Gateway')

	await app.listen(port)
	logger.log(`(🚀 Server has started on http://localhost:${port}/graphql`)
}
bootstrap()
