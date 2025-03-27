import {
	ClientProxyFactory,
	ClientProxy,
	Transport
} from '@nestjs/microservices'
import { Mutation, Resolver, Query, Args } from '@nestjs/graphql'
import { OnModuleInit } from '@nestjs/common'

import {
	TweetMutationDto,
	serviceActions,
	wrapResolvers,
	servicePorts,
	ResTweetDto,
	AuthContext,
	IsPublic,
	AuthCtx
} from '@libs'

const { TWEET } = serviceActions

@Resolver()
export class TweetResolvers implements OnModuleInit {
	private client: ClientProxy

	onModuleInit() {
		this.client = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: { port: servicePorts.TWEET.port }
		})
	}

	///// @Query
	@Query(() => [ResTweetDto])
	@IsPublic()
	async tweet_getTweets(): Promise<ResTweetDto[]> {
		return wrapResolvers(this.client.send(TWEET.getTweets, {}))
	}

	///// @Mutation
	@Mutation(() => ResTweetDto)
	async tweet_cudTweet(
		@Args('input') body: TweetMutationDto,
		@AuthContext() context: AuthCtx
	): Promise<ResTweetDto> {
		return wrapResolvers(this.client.send(TWEET.cudTweet, { body, context }))
	}
}
