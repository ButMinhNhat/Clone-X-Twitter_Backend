import { Controller, HttpException, HttpStatus } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { UserService } from './user.service'
import { User } from './user.entity'

@Controller()
export class UserController {
	constructor(private userService: UserService) {}

	@MessagePattern('user.sign_in')
	async signIn(
		body: Pick<User, 'email' | 'password'>
	): Promise<User & { accessToken: string; refreshToken: string }> {
		try {
			return this.userService.signIn(body)
		} catch (error) {
			throw new HttpException(
				error.message || 'Error occur!',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	@MessagePattern('user.sign_up')
	async signUp(
		body: Pick<User, 'email' | 'fullName' | 'password'>
	): Promise<User & { accessToken: string; refreshToken: string }> {
		try {
			return this.userService.signUp(body)
		} catch (error) {
			throw new HttpException(
				error.message || 'Error occur!',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	@MessagePattern('user.get_user')
	async getUser(): Promise<User[]> {
		return this.userService.getUser()
	}
}
