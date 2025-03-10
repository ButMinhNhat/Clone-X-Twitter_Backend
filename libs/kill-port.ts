import { execSync } from 'child_process'

export const killPort = (port: number) => {
	if (!port) process.exit(1)

	try {
		const pid = execSync(`netstat -ano | findstr :${port}`)
			.toString()
			.trim()
			.split(/\s+/)[4]
		if (pid) execSync(`taskkill /PID ${pid} /F`)
	} catch (error) {}
}
