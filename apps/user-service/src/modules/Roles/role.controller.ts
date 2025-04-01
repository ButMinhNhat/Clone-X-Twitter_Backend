import { MessagePattern } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'

import { serviceActions, CUDRoleReq, RoleDTO, AuthCtx } from '@libs'
import { RoleService } from './role.service'

const { USER_SERVICE } = serviceActions

@Controller()
export class RoleController {
	constructor(private roleService: RoleService) {}

	@MessagePattern(USER_SERVICE.getRoles)
	async getRoles(): Promise<RoleDTO[]> {
		return this.roleService.getRole()
	}

	@MessagePattern(USER_SERVICE.cudRole)
	async cudRole(payload: {
		body: CUDRoleReq
		context: AuthCtx
	}): Promise<RoleDTO> {
		return this.roleService.cudRole(payload.body)
	}
}
