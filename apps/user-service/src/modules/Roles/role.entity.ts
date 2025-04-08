import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
	Column,
	Entity
} from 'typeorm'

import { Action } from '../Actions/action.entity'
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
	@ManyToMany(() => Action, action => action.roles)
	@JoinTable()
	actions: Action[]

	@ManyToMany(() => User, user => user.roles)
	users: User[]
}
