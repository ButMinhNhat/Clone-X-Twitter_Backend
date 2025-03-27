import {
	registerEnumType,
	PartialType,
	ObjectType,
	InputType,
	PickType,
	Field,
	ID
} from '@nestjs/graphql'

import { RefTweetType } from '../common'
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

@InputType()
export class TweetMutationDto extends PartialType(
	PickType(
		TweetDTO,
		['id', 'profileId', 'contents', 'images', 'video'],
		InputType
	)
) {
	@Field({ nullable: true })
	isDelete?: boolean
}

@ObjectType()
export class ResTweetDto extends TweetDTO {
	@Field(() => UserDTO, { nullable: true })
	profile?: Partial<UserDTO>

	@Field(() => TweetDTO, { nullable: true })
	refTweet?: TweetDTO
}
