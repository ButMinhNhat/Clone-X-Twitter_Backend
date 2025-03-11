import {
	ClientProxyFactory,
	ClientProxy,
	Transport
} from '@nestjs/microservices'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { OnModuleInit } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

import { UserDTO, SignUpReq, SignUpRes, SignInReq } from 'src/DTOs/user.dto'

@Resolver()
export class UserResolvers implements OnModuleInit {
	private client: ClientProxy

	onModuleInit() {
		this.client = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: { port: 8081 }
		})
	}

	///// @Mutation
	@Mutation(() => SignUpRes)
	async user_SignIn(@Args('input') body: SignInReq): Promise<string> {
		return firstValueFrom(this.client.send('user.sign_in', body))
	}

	@Mutation(() => SignUpRes)
	async user_SignUp(@Args('input') body: SignUpReq): Promise<string> {
		return firstValueFrom(this.client.send('user.sign_up', body))
	}

	///// @Query
	@Query(() => [UserDTO])
	async user_GetUser(): Promise<UserDTO[]> {
		const result = await firstValueFrom(this.client.send('user.get_user', {}))
		return result
	}
}
