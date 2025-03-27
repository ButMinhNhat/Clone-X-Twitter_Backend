import { MessagePattern } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'

import { AuthCtx, serviceActions } from '@libs'
import { TweetService } from './tweet.service'
import { Tweet } from './tweet.entity'

const { TWEET } = serviceActions

@Controller()
export class TweetController {
	constructor(private tweetService: TweetService) {}

	@MessagePattern(TWEET.getTweets)
	async getTweet(): Promise<Tweet[]> {
		return this.tweetService.getTweets()
	}

	@MessagePattern(TWEET.cudTweet)
	async processTweet(payload: {
		body: Partial<Tweet> & { isDelete: boolean }
		context: AuthCtx
	}): Promise<Tweet> {
		const { body, context } = payload
		const { isDelete, id, ...entity } = body

		// Delete
		if (isDelete) return this.tweetService.deleteTweet(id, context)

		// Update
		if (id) return this.tweetService.updateTweet({ ...entity, id }, context)

		// Create
		return this.tweetService.createTweet(entity, context)
	}
}
