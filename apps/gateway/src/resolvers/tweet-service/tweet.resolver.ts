import { Mutation, Resolver, Query, Args } from '@nestjs/graphql'
import { ClientProxy } from '@nestjs/microservices'

import {
	TweetMutationDto,
	serviceActions,
	wrapResolvers,
	ResTweetDto,
	AuthContext,
	IsPublic,
	AuthCtx
} from '@libs'
import { TweetClient } from 'src/clients'

const { TWEET_SERVICE } = serviceActions

@Resolver()
export class TweetResolvers {
	private client: ClientProxy

	constructor(private readonly tweetClient: TweetClient) {
		this.client = tweetClient.getClient()
	}

	///// @Query
	@Query(() => [ResTweetDto])
	@IsPublic()
	async tweet_getTweets(): Promise<ResTweetDto[]> {
		return wrapResolvers(this.client.send(TWEET_SERVICE.getTweets, {}))
	}

	///// @Mutation
	@Mutation(() => ResTweetDto)
	async tweet_cudTweet(
		@Args('input') body: TweetMutationDto,
		@AuthContext() context: AuthCtx
	): Promise<ResTweetDto> {
		return wrapResolvers(
			this.client.send(TWEET_SERVICE.cudTweet, { body, context })
		)
	}
}
