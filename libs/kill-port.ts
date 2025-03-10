import { execSync } from 'child_process'

const killPort = () => {
	const port = process.argv[2]
	if (!port) process.exit(1)

	try {
		const pid = execSync(`netstat -ano | findstr :${port}`)
			.toString()
			.trim()
			.split(/\s+/)[4]
		if (pid) execSync(`taskkill /PID ${pid} /F`)
	} catch (error) {
		console.error(`Error occurred while killing port ${port}:`, error)
	}
}

killPort()
