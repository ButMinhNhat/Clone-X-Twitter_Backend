import { Field, ObjectType, ID, InputType } from '@nestjs/graphql'

// Response
@ObjectType()
export class RoleDTO {
	@Field(() => ID)
	id: string

	@Field()
	name: string

	@Field()
	description: string

	@Field()
	createdAt: string

	@Field()
	updatedAt: string
}

// Request
@InputType()
export class CUDRoleReq {
	@Field(() => ID, { nullable: true })
	id?: string

	@Field()
	name: string

	@Field()
	description: string

	@Field({ nullable: true })
	isDelete?: boolean
}
