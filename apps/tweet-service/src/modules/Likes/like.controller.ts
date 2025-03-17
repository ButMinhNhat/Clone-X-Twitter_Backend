import { MessagePattern } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'

import { LikeService } from './like.service'
import { serviceActions } from '@libs'
import { Like } from './like.entity'

const { TWEET } = serviceActions

@Controller()
export class LikeController {
	constructor(private likeService: LikeService) {}
}
