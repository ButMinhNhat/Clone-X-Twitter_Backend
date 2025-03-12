import { MessagePattern } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'

import { UserService } from './user.service'
import { User } from './user.entity'
import { AuthRes } from '@libs'

@Controller()
export class UserController {
	constructor(private userService: UserService) {}

	@MessagePattern('user.sign_in')
	async signIn(body: Pick<User, 'email' | 'password'>): Promise<AuthRes> {
		return this.userService.signIn(body)
	}

	@MessagePattern('user.sign_up')
	async signUp(
		body: Pick<User, 'email' | 'fullName' | 'password'>
	): Promise<AuthRes> {
		return this.userService.signUp(body)
	}

	@MessagePattern('user.get_user')
	async getUser(): Promise<User[]> {
		return this.userService.getUser()
	}
}
