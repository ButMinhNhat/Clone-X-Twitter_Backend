import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ActionController } from './action.controller'
import { ActionService } from './action.service'
import { Action } from './action.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Action])],
	controllers: [ActionController],
	providers: [ActionService]
})
export class ActionModule {}
