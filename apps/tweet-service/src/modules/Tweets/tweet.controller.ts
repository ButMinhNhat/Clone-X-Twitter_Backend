import { MessagePattern } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'

import { TweetService } from './tweet.service'
import { Tweet } from './tweet.entity'
import { serviceActions } from '@libs'

const { TWEET } = serviceActions

@Controller()
export class TweetController {
	constructor(private tweetService: TweetService) {}

	@MessagePattern(TWEET.getTweets)
	async getTweet(): Promise<Tweet[]> {
		return this.tweetService.getTweet()
	}
}
