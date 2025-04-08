import { MessagePattern } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'

import { ActionService } from './action.service'
import { Action } from './action.entity'
import { serviceActions } from '@libs'

const { USER_SERVICE } = serviceActions

@Controller()
export class ActionController {
	constructor(private roleService: ActionService) {}

	@MessagePattern(USER_SERVICE.getActions)
	async getRoles(): Promise<Action[]> {
		return this.roleService.getActions()
	}
}
