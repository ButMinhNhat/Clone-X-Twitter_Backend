import { NotFoundException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CUDRoleReq, RoleDTO } from '@libs'
import { Role } from './role.entity'

@Injectable()
export class RoleService {
	constructor(
		@InjectRepository(Role)
		private roleRepository: Repository<Role>
	) {}

	// Main services

	getRole = async (): Promise<RoleDTO[]> => this.roleRepository.find()

	cudRole = async ({ id, isDelete, ...body }: CUDRoleReq): Promise<RoleDTO> => {
		let reqBody = body

		// check delete
		if (id && isDelete) {
			const resDelete = await this.roleRepository.delete(id)
			if (!resDelete.affected) throw new NotFoundException('Role not found!')
			return null
		}

		// check update
		if (id) {
			const existedData = await this.roleRepository.findOne({ where: { id } })
			if (!existedData) throw new NotFoundException('Role not found!')
			reqBody = Object.assign(existedData, reqBody)
		}

		// upsert data
		const roleEntity = this.roleRepository.create(reqBody)
		return this.roleRepository.save(roleEntity)
	}
}
