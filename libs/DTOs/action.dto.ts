import { Field, ObjectType, ID } from '@nestjs/graphql'

// Response
@ObjectType()
export class ActionDTO {
	@Field(() => ID)
	id: string

	@Field()
	name: string
}
