export const servicePorts = {
	GATEWAY: {
		port: 8080,
		name: 'Gateway'
	},
	USER: {
		port: 8081,
		name: 'User Service',
		database: 'user_service'
	},
	TWEET: {
		port: 8082,
		name: 'Tweet Service',
		database: 'tweet_service'
	}
}

export const serviceActions = {
	///// User service
	USER: {
		// User
		signIn: 'user.sign_in',
		signUp: 'user.sign_up',
		getUsers: 'user.get_user'
	},

	///// Tweet service
	TWEET: {
		// Tweet
		getTweets: 'tweet.get_tweets',

		// Comment
		getComments: 'tweet.get_comments'
	}
}
