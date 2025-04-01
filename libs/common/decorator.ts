import {
	createParamDecorator,
	ExecutionContext,
	SetMetadata
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const AuthContext = createParamDecorator(
	(data: any, ctx: ExecutionContext) => {
		const gqlContext = GqlExecutionContext.create(ctx)
		const request = gqlContext.getContext().req
		return request.authContext || {}
	}
)

export const IsPublic = () => SetMetadata('isPublic', true)
