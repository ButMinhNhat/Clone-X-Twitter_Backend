import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { LikeController } from './like.controller'
import { LikeService } from './like.service'
import { Like } from './like.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Like])],
	controllers: [LikeController],
	providers: [LikeService]
})
export class LikeModule {}
