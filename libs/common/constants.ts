// Constants
export const servicePorts = {
	GATEWAY: {
		port: 8080,
		name: 'Gateway'
	},
	USER_SERVICE: {
		port: 8081,
		name: 'User Service',
		database: 'user_service'
	},
	TWEET_SERVICE: {
		port: 8082,
		name: 'Tweet Service',
		database: 'tweet_service'
	}
}

export const serviceActions = {
	///// User service
	USER_SERVICE: {
		// User
		signIn: 'user.sign_in',
		signUp: 'user.sign_up',
		authentication: 'user.authentication',
		getUsers: 'user.get_users',

		// Role
		getRoles: 'role.get_roles',
		cudRole: 'role.cud_role',

		// Action
		getActions: 'action.get_actions'
	},

	///// Tweet service
	TWEET_SERVICE: {
		// Tweet
		getTweets: 'tweet.get_tweets',
		cudTweet: 'tweet.cud_tweet',

		// Comment
		getComments: 'tweet.get_comments',

		// Like
		getLikes: 'tweet.get_likes'
	}
}

// Type & Interface
export type AuthCtx = {
	userId: string
	actions: string[]
}
