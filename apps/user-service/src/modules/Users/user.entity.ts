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
import { Role } from '../Roles/role.entity'

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@Column({ nullable: true })
	verifiedAt: string

	@CreateDateColumn()
	createdAt: string

	@UpdateDateColumn()
	updatedAt: string

	// Relations
	@ManyToMany(() => Role, role => role.users)
	@JoinTable()
	roles: Role[]

	@ManyToMany(() => Action, action => action.users)
	actions: Action[]
}
