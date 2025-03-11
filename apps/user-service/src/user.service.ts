import { BadGatewayException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './user.entity'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

type AuthRes = User & { accessToken: string; refreshToken: string }

@Injectable()
export class UserService {
	private salt = 10
	private secretKey = 'NHTN'

	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {}

	private generateJWT = (payload: any) => ({
		accessToken: jwt.sign(payload, this.secretKey, { expiresIn: '15m' }),
		refreshToken: jwt.sign(payload, this.secretKey, { expiresIn: '7d' })
	})

	// Main services

	signIn = async ({
		email,
		password
	}: Pick<User, 'email' | 'password'>): Promise<AuthRes> => {
		if (!email || !password)
			throw new BadGatewayException('Invalid email or password!')

		// Find user and check password
		const userDetail = await this.userRepository.findOne({ where: { email } })
		if (!userDetail || !bcrypt.compare(password, userDetail.password))
			throw new BadGatewayException('Invalid email or password!')

		return { ...userDetail, ...this.generateJWT({ userId: userDetail.id }) }
	}

	signUp = async ({
		email,
		fullName,
		password
	}: Pick<User, 'email' | 'fullName' | 'password'>): Promise<AuthRes> => {
		if (!email || !fullName || !password)
			throw new BadGatewayException('Invalid email, fullName or password!')

		// hash password and save data
		const hashPassword = await bcrypt.hash(password, this.salt)
		const userEntity = this.userRepository.create({
			email,
			fullName,
			password: hashPassword
		})
		const result = await this.userRepository.save(userEntity)

		return { ...result, ...this.generateJWT({ userId: result.id }) }
	}

	getUser = async (): Promise<User[]> => this.userRepository.find()
}
