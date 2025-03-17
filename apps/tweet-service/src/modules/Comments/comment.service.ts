import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Comment } from './comment.entity'

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(Comment)
		private commentRepository: Repository<Comment>
	) {}

	// Main services

	getComment = async (): Promise<Comment[]> => this.commentRepository.find()
}
