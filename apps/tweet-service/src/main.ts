import { CommentModule, TweetModule, LikeModule, ViewModule } from './modules'
import { generateBoostrap } from '@libs'

generateBoostrap('TWEET_SERVICE', [
	CommentModule,
	TweetModule,
	LikeModule,
	ViewModule
])
