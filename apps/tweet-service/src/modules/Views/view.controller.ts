import { MessagePattern } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'

import { ViewService } from './view.service'
import { serviceActions } from '@libs'
import { View } from './view.entity'

const { TWEET } = serviceActions

@Controller()
export class ViewController {
	constructor(private viewService: ViewService) {}
}
