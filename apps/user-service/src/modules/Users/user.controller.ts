import { MessagePattern } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'

import { serviceActions, AuthRes } from '@libs'
import { UserService } from './user.service'
import { User } from './user.entity'

const { USER } = serviceActions

@Controller()
export class UserController {
	constructor(private userService: UserService) {}

	@MessagePattern(USER.signIn)
	async signIn(body: Pick<User, 'email' | 'password'>): Promise<AuthRes> {
		return this.userService.signIn(body)
	}

	@MessagePattern(USER.signUp)
	async signUp(
		body: Pick<User, 'email' | 'fullName' | 'password'>
	): Promise<AuthRes> {
		return this.userService.signUp(body)
	}

	@MessagePattern(USER.getUsers)
	async getUser(): Promise<User[]> {
		return this.userService.getUser()
	}
}
