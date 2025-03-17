import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	Column,
	Entity
} from 'typeorm'

@Entity('views')
export class View {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'uuid' })
	userId: string

	@CreateDateColumn()
	createdAt: string
}
