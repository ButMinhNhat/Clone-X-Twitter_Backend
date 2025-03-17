import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Tweet } from './tweet.entity'

@Injectable()
export class TweetService {
	constructor(
		@InjectRepository(Tweet)
		private tweetRepository: Repository<Tweet>
	) {}

	// Main services

	getTweet = async (): Promise<Tweet[]> => this.tweetRepository.find()
}
