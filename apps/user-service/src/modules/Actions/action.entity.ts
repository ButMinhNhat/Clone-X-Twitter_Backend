import {
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToMany,
	Column,
	Entity
} from 'typeorm'

import { User } from '../Users/user.entity'
import { Role } from '../Roles/role.entity'

@Entity('actions')
export class Action {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true })
	name: string

	// Relations
	@ManyToMany(() => User, user => user.actions)
	@JoinColumn()
	users: User[]

	@ManyToMany(() => Role, role => role.actions)
	roles: Role[]
}
