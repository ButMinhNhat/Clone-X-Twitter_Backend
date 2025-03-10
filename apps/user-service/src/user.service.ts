import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
	getUser = async (): Promise<string> => {
		return 'Hello World!'
	}
}
