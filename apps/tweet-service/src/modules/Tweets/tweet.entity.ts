import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	JoinColumn,
	OneToMany,
	ManyToOne,
	Column,
	Entity
} from 'typeorm'

@Entity('tweets')
export class Tweet {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'uuid', nullable: true })
	refTweetId: string

	@Column({ type: 'uuid' })
	authorId: string

	@Column()
	contents: string

	@Column('text', { array: true })
	images: string[]

	@Column()
	video: string

	@CreateDateColumn()
	createdAt: string

	@UpdateDateColumn()
	updatedAt: string

	// Relations
	@ManyToOne(() => Tweet, tweet => tweet.reTweets, {
		onDelete: 'CASCADE',
		nullable: true
	})
	@JoinColumn({ name: 'refTweetId' })
	refTweet: Tweet

	@OneToMany(() => Tweet, tweet => tweet.refTweet)
	reTweets: Tweet[]
}
