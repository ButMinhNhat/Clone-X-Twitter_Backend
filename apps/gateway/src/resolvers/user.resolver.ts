import {
	ClientProxyFactory,
	ClientProxy,
	Transport
} from '@nestjs/microservices'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { OnModuleInit } from '@nestjs/common'

import {
	wrapResolvers,
	SignInReq,
	SignUpReq,
	AuthRes,
	UserDTO,
	ports
} from '@libs'

@Resolver()
export class UserResolvers implements OnModuleInit {
	private client: ClientProxy

	onModuleInit() {
		this.client = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: { port: ports.USER.port }
		})
	}

	///// @Mutation
	@Mutation(() => AuthRes)
	async user_SignIn(@Args('input') body: SignInReq): Promise<AuthRes> {
		return wrapResolvers(this.client.send('user.sign_in', body))
	}

	@Mutation(() => AuthRes)
	async user_SignUp(@Args('input') body: SignUpReq): Promise<AuthRes> {
		return wrapResolvers(this.client.send('user.sign_up', body))
	}

	///// @Query
	@Query(() => [UserDTO])
	async user_GetUser(): Promise<UserDTO[]> {
		const result = await wrapResolvers(this.client.send('user.get_user', {}))
		return result
	}
}
