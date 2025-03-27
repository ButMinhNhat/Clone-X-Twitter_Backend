import {
	ClientProxyFactory,
	ClientProxy,
	Transport
} from '@nestjs/microservices'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { OnModuleInit } from '@nestjs/common'

import {
	serviceActions,
	wrapResolvers,
	servicePorts,
	SignInReq,
	SignUpReq,
	IsPublic,
	AuthRes,
	UserDTO
} from '@libs'

const { USER } = serviceActions

@Resolver()
export class UserResolvers implements OnModuleInit {
	private client: ClientProxy

	onModuleInit() {
		this.client = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: { port: servicePorts.USER.port }
		})
	}

	///// @Mutation
	@Mutation(() => AuthRes)
	@IsPublic()
	async user_SignIn(@Args('input') body: SignInReq): Promise<AuthRes> {
		return wrapResolvers(this.client.send(USER.signIn, body))
	}

	@Mutation(() => AuthRes)
	@IsPublic()
	async user_SignUp(@Args('input') body: SignUpReq): Promise<AuthRes> {
		return wrapResolvers(this.client.send(USER.signUp, body))
	}

	///// @Query
	@Query(() => [UserDTO])
	async user_GetUser(): Promise<UserDTO[]> {
		const result = await wrapResolvers(this.client.send(USER.getUsers, {}))
		return result
	}
}
