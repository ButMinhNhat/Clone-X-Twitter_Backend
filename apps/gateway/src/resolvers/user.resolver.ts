import {
	ClientProxyFactory,
	ClientProxy,
	Transport
} from '@nestjs/microservices'
import { Query, Resolver } from '@nestjs/graphql'
import { OnModuleInit } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

@Resolver()
export class UserResolvers implements OnModuleInit {
	private client: ClientProxy

	onModuleInit() {
		this.client = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: { port: 8081 }
		})
	}

	@Query(() => String)
	async getUser() {
		const result = await firstValueFrom(this.client.send('get_user', {}))
		return result
	}
}
