import { Field, ObjectType, ID } from '@nestjs/graphql'

import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	Entity
} from 'typeorm'

@Entity('users')
@ObjectType()
export class User {
	@PrimaryGeneratedColumn('uuid')
	@Field(type => ID)
	id: string

	@Column({ unique: true })
	@Field()
	email: string

	@Column()
	@Field()
	password: string

	@Column()
	@Field()
	avatar: string

	@CreateDateColumn()
	@Field()
	createdAt: Date

	@UpdateDateColumn()
	@Field()
	updatedAt: Date
}
