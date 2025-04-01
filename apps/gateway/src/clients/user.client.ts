import {
	ClientProxyFactory,
	ClientProxy,
	Transport
} from '@nestjs/microservices'
import { Injectable, OnModuleInit } from '@nestjs/common'

import { servicePorts } from '@libs'

@Injectable()
export class UserClient implements OnModuleInit {
	private client: ClientProxy

	onModuleInit() {
		this.client = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: { port: servicePorts.USER_SERVICE.port }
		})
	}

	getClient(): ClientProxy {
		return this.client
	}
}
