import {
	BadRequestException,
	NotFoundException,
	Injectable
} from '@nestjs/common'
import { FindOneOptions, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { AuthCtx, RefTweetType } from '@libs'
import { Tweet } from './tweet.entity'

@Injectable()
export class TweetService {
	constructor(
		@InjectRepository(Tweet)
		private tweetRepository: Repository<Tweet>
	) {}

	// Main services

	getTweets = async () => this.tweetRepository.find()

	getTweet = async (
		options: FindOneOptions<Tweet>,
		showProfile: boolean = false
	): Promise<Tweet> => {
		const result = await this.tweetRepository.findOne(options)
		if (!result) throw new NotFoundException('Tweet not found!')
		return result
	}

	createTweet = async (
		body: Partial<Tweet>,
		{ userId }: AuthCtx
	): Promise<Tweet> => {
		const { refTweetId, profileId } = body

		const [refTweet] = await Promise.all([
			// check valid refTweetId
			refTweetId
				? (async () => {
						const refTweetData = await this.getTweet({
							select: [
								'id',
								'refTweetId',
								'refTweetType',
								'profileId',
								'contents',
								'images',
								'video'
							],
							where: { id: refTweetId }
						})
						if (
							refTweetData.refTweetId &&
							refTweetData.refTweetType === RefTweetType.REPOST
						)
							throw new BadRequestException(`Repost tweet can't be retweet!`)
						return refTweetData
					})()
				: null
		])

		// create data
		const tweetEntity = this.tweetRepository.create({ ...body, userId })
		const resTweet = await this.tweetRepository.save(tweetEntity)

		return { ...resTweet, refTweet }
	}

	updateTweet = async (
		{ id, ...body }: Partial<Tweet>,
		context: AuthCtx
	): Promise<Tweet> => {
		const existedData = await this.getTweet({ where: { id } })
		await this.tweetRepository.save(Object.assign(existedData, body))
		return this.getTweet({ where: { id }, relations: ['refTweet'] }, true)
	}

	deleteTweet = async (id: string, context: AuthCtx) => {
		const result = await this.tweetRepository.delete({ id })
		if (!result.affected) throw new NotFoundException('Tweet not found!')
		return null
	}
}
