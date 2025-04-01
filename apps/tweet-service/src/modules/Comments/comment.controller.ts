import { MessagePattern } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'

import { CommentService } from './comment.service'
import { Comment } from './comment.entity'
import { serviceActions } from '@libs'

const { TWEET_SERVICE } = serviceActions

@Controller()
export class CommentController {
	constructor(private commentService: CommentService) {}

	@MessagePattern(TWEET_SERVICE.getComments)
	async getTweet(): Promise<Comment[]> {
		return this.commentService.getComment()
	}
}
