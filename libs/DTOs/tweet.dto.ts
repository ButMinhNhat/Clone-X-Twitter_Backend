import {
	registerEnumType,
	ObjectType,
	PickType,
	Field,
	ID
} from '@nestjs/graphql'

import { RefTweetType } from '@libs/enums'
import { UserDTO } from './user.dto'

registerEnumType(RefTweetType, { name: 'RefTweetType' })

@ObjectType()
export class TweetDTO {
	@Field(() => ID)
	id: string

	@Field(() => ID)
	profileId: string

	@Field(() => ID, { nullable: true })
	refTweetId: string

	@Field(() => RefTweetType, { nullable: true })
	refTweetType: RefTweetType

	@Field()
	isPinned: boolean

	@Field()
	contents: string

	@Field(() => [String], { nullable: true })
	images: string[]

	@Field({ nullable: true })
	video: string

	@Field()
	createdAt: string

	@Field()
	updatedAt: string
}

export class TweetMutationDto extends PickType(TweetDTO, [
	'id',
	'profileId',
	'refTweetId',
	'refTweetType',
	'contents',
	'images',
	'video'
]) {
	@Field({ nullable: true })
	isDelete: boolean
}

export class ResTweetDto extends TweetDTO {
	@Field()
	profile?: Partial<UserDTO>

	@Field(() => TweetDTO, { nullable: true })
	refTweet?: TweetDTO
}
