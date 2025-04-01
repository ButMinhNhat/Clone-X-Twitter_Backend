import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import {
	serviceActions,
	wrapResolvers,
	SignInReq,
	SignUpReq,
	IsPublic,
	AuthRes,
	UserDTO
} from '@libs'
import { UserClient } from 'src/clients'

const { USER_SERVICE } = serviceActions

@Resolver()
export class UserResolvers {
	constructor(private readonly userClient: UserClient) {}

	///// @Query
	@Query(() => [UserDTO])
	async user_GetUser(): Promise<UserDTO[]> {
		const result = await wrapResolvers(
			this.userClient.getClient().send(USER_SERVICE.getUsers, {})
		)
		return result
	}

	///// @Mutation
	@Mutation(() => AuthRes)
	@IsPublic()
	async user_SignIn(@Args('input') body: SignInReq): Promise<AuthRes> {
		return wrapResolvers(
			this.userClient.getClient().send(USER_SERVICE.signIn, body)
		)
	}

	@Mutation(() => AuthRes)
	@IsPublic()
	async user_SignUp(@Args('input') body: SignUpReq): Promise<AuthRes> {
		return wrapResolvers(
			this.userClient.getClient().send(USER_SERVICE.signUp, body)
		)
	}
}
