import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ViewController } from './view.controller'
import { ViewService } from './view.service'
import { View } from './view.entity'

@Module({
	imports: [TypeOrmModule.forFeature([View])],
	controllers: [ViewController],
	providers: [ViewService]
})
export class ViewModule {}
