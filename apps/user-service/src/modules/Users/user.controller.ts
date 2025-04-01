import { MessagePattern } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'

import { serviceActions, AuthRes, UserDTO } from '@libs'
import { UserService } from './user.service'
import { User } from './user.entity'

const { USER_SERVICE } = serviceActions

@Controller()
export class UserController {
	constructor(private userService: UserService) {}

	@MessagePattern(USER_SERVICE.signIn)
	async signIn(body: Pick<User, 'email' | 'password'>): Promise<AuthRes> {
		return this.userService.signIn(body)
	}

	@MessagePattern(USER_SERVICE.signUp)
	async signUp(body: Pick<User, 'email' | 'password'>): Promise<AuthRes> {
		return this.userService.signUp(body)
	}

	@MessagePattern(USER_SERVICE.authentication)
	async authentication(token: string): Promise<UserDTO> {
		return this.userService.authentication(token)
	}

	@MessagePattern(USER_SERVICE.getUsers)
	async getUser(): Promise<User[]> {
		return this.userService.getUser()
	}
}
