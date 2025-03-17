import { CommentModule, TweetModule } from './modules'
import { generateBoostrap } from '@libs'

generateBoostrap('TWEET', [TweetModule, CommentModule])
