import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import {
	serviceActions,
	wrapResolvers,
	AuthContext,
	CUDRoleReq,
	AuthCtx,
	RoleDTO
} from '@libs'
import { UserClient } from 'src/clients'

const { USER_SERVICE } = serviceActions

@Resolver()
export class RoleResolvers {
	constructor(private readonly userClient: UserClient) {}

	///// @Query
	@Query(() => [RoleDTO])
	async user_GetRoles(@AuthContext() context: AuthCtx): Promise<RoleDTO[]> {
		const result = await wrapResolvers(
			this.userClient.getClient().send(USER_SERVICE.getRoles, { context })
		)
		return result
	}

	///// @Mutation
	@Mutation(() => RoleDTO)
	async user_CudRole(
		@Args('input') body: CUDRoleReq,
		@AuthContext() context: AuthCtx
	): Promise<RoleDTO> {
		return wrapResolvers(
			this.userClient.getClient().send(USER_SERVICE.cudRole, { body, context })
		)
	}
}
