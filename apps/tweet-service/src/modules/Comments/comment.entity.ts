import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Column,
	Entity
} from 'typeorm'

@Entity('comments')
export class Comment {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'uuid', nullable: true })
	targetId: string

	@Column({ type: 'uuid', nullable: true })
	parentId: string

	@Column({ type: 'uuid' })
	userId: string

	@Column()
	contents: string

	@Column()
	images: string[]

	@Column()
	video: string

	@CreateDateColumn()
	createdAt: string

	@UpdateDateColumn()
	updatedAt: string

	// Relations
	@ManyToOne(() => Comment, comment => comment.contents, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'parentId' })
	parent: Comment

	@OneToMany(() => Comment, comment => comment.parent)
	children: Comment[]
}
