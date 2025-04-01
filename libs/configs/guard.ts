import {
	BadRequestException,
	ExecutionContext,
	CanActivate,
	Injectable
} from '@nestjs/common'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Reflector } from '@nestjs/core'

import { serviceActions, servicePorts, wrapResolvers } from '../common'

const { USER_SERVICE } = serviceActions

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
			options: { port: servicePorts.USER_SERVICE.port }
		})
		const resUser = await wrapResolvers(
			userServiceClient.send(USER_SERVICE.authentication, token)
		)

		req.authContext = { userId: resUser.id, actions: [] }
		return true
	}
}

@Injectable()
export class Public implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		return true
	}
}
