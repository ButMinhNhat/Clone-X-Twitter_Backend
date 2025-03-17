import { MessagePattern } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'

import { CommentService } from './comment.service'
import { Comment } from './comment.entity'
import { serviceActions } from '@libs'

const { TWEET } = serviceActions

@Controller()
export class CommentController {
	constructor(private commentService: CommentService) {}

	@MessagePattern(TWEET.getComments)
	async getTweet(): Promise<Comment[]> {
		return this.commentService.getComment()
	}
}
