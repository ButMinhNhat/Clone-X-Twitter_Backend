import { Query, Resolver } from '@nestjs/graphql'

import {
	serviceActions,
	wrapResolvers,
	AuthContext,
	ActionDTO,
	AuthCtx
} from '@libs'
import { UserClient } from 'src/clients'

const { USER_SERVICE } = serviceActions

@Resolver()
export class ActionResolvers {
	constructor(private readonly userClient: UserClient) {}

	///// @Query
	@Query(() => [ActionDTO])
	async user_GetActions(@AuthContext() context: AuthCtx): Promise<ActionDTO[]> {
		const result = await wrapResolvers(
			this.userClient.getClient().send(USER_SERVICE.getActions, { context })
		)
		return result
	}

	///// @Mutation
}
