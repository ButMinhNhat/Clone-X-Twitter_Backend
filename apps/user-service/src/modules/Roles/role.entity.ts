import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	Column,
	Entity
} from 'typeorm'

import { User } from '../Users/user.entity'

@Entity('roles')
export class Role {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true })
	name: string

	@Column({ default: '' })
	description: string

	@CreateDateColumn()
	createdAt: string

	@UpdateDateColumn()
	updatedAt: string

	// Relations
	@ManyToMany(() => User, user => user.roles)
	users: User[]
}
