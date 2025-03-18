import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

import { AuthRes, UserDTO } from '@libs'
import { User } from './user.entity'

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
			throw new BadRequestException('Invalid email or password!')

		// Find user and check password
		const userDetail = await this.userRepository.findOne({ where: { email } })
		if (!userDetail || !bcrypt.compare(password, userDetail.password))
			throw new BadRequestException('Invalid email or password!')

		return { ...userDetail, ...this.generateJWT({ userId: userDetail.id }) }
	}

	signUp = async ({
		email,
		fullName,
		password
	}: Pick<User, 'email' | 'fullName' | 'password'>): Promise<AuthRes> => {
		if (!email || !fullName || !password)
			throw new BadRequestException('Invalid email, fullName or password!')

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

	authentication = async (token: string): Promise<UserDTO> => {
		// verify JWT
		let userId: string
		jwt.verify(token, this.secretKey, (err, decoded) => {
			if (err) throw new UnauthorizedException(err.message)
			userId = (decoded as jwt.JwtPayload).userId || ''
		})

		// find user
		const userDetail = await this.userRepository.findOne({
			where: { id: userId }
		})
		if (!userDetail) throw new UnauthorizedException('Unauthorized')
		return userDetail
	}

	getUser = async (): Promise<User[]> => this.userRepository.find()
}
