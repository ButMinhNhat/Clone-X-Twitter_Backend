import { Field, ObjectType, ID, InputType } from '@nestjs/graphql'

@ObjectType()
export class UserDTO {
	@Field(() => ID)
	id: string

	@Field()
	email: string

	@Field()
	fullName: string

	@Field({ nullable: true })
	avatar: string

	@Field()
	createdAt: string

	@Field()
	updatedAt: string
}

@InputType()
export class SignUpReq {
	@Field()
	email: string

	@Field()
	fullName: string

	@Field()
	password: string
}

@InputType()
export class SignInReq {
	@Field()
	email: string

	@Field()
	password: string
}

@ObjectType()
export class AuthRes extends UserDTO {
	@Field()
	accessToken: string

	@Field()
	refreshToken: string
}
