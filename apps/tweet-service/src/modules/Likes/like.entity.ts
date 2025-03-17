import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	Column,
	Entity
} from 'typeorm'

@Entity('likes')
export class Like {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'uuid' })
	userId: string

	@CreateDateColumn()
	createdAt: string
}
