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

import { RefTweetType } from '@libs'

@Entity('tweets')
export class Tweet {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'uuid' })
	profileId: string

	@Column({ type: 'uuid', nullable: true })
	refTweetId: string

	@Column({ type: 'enum', enum: RefTweetType, nullable: true })
	refTweetType: RefTweetType

	@Column({ type: 'boolean', default: false })
	isPinned: boolean

	@Column()
	contents: string

	@Column({ type: 'text', array: true, nullable: true })
	images: string[]

	@Column({ nullable: true })
	video: string

	@Column({ type: 'uuid' })
	userId: string

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
