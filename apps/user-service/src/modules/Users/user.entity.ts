import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	Entity
} from 'typeorm'

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@Column()
	fullName: string

	@Column({ nullable: true })
	avatar: string

	@CreateDateColumn()
	createdAt: string

	@UpdateDateColumn()
	updatedAt: string
}
