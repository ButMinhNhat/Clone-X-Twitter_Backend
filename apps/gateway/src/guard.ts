import {
	UnauthorizedException,
	BadRequestException,
	ExecutionContext,
	CanActivate,
	Injectable,
	SetMetadata
} from '@nestjs/common'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Reflector } from '@nestjs/core'
import { firstValueFrom } from 'rxjs'

import { serviceActions, servicePorts } from '@libs'

const { USER } = serviceActions

export const IsPublic = () => SetMetadata('isPublic', true)

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		// check public resolver
		const isPublic = this.reflector.get<boolean>(
			'isPublic',
			context.getHandler()
		)
		if (isPublic) return true

		// get token
		const ctx = GqlExecutionContext.create(context)
		const req = ctx.getContext().req

		const authHeader = req.headers.authorization
		if (!authHeader) throw new BadRequestException('Missing token in headers!')
		const token: string = authHeader.split(' ')[1]

		// validate token
		const userServiceClient = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: { port: servicePorts.USER.port }
		})
		try {
			const resUser = await firstValueFrom(
				userServiceClient.send(USER.authentication, token)
			)
			if (resUser.status === 401)
				throw new UnauthorizedException(resUser.message)

			req.user = resUser
			return true
		} catch (error) {
			throw new Error(error)
		}
	}
}

@Injectable()
export class Public implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		return true
	}
}
