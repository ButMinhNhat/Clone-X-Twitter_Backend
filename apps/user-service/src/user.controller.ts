import { MessagePattern } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'

import { UserService } from './user.service'

@Controller()
export class UserController {
	constructor(private userService: UserService) {}

	@MessagePattern('get_user')
	async getUser(): Promise<string> {
		return this.userService.getUser()
	}
}
