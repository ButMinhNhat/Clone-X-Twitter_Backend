import { CommentModule, TweetModule, LikeModule, ViewModule } from './modules'
import { generateBoostrap } from '@libs'

generateBoostrap('TWEET', [CommentModule, TweetModule, LikeModule, ViewModule])
