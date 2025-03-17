export const servicePorts = {
	GATEWAY: {
		port: 8080,
		name: 'Gateway'
	},
	USER: {
		port: 8081,
		name: 'User Service',
		database: 'test_database'
	},
	TWEET: {
		port: 8082,
		name: 'Tweet Service',
		database: 'tweet_database'
	}
}

export const serviceActions = {
	USER: {
		// User
		signIn: 'user.sign_in',
		signUp: 'user.sign_up',
		getUsers: 'user.get_user'
	},
	TWEET: {
		// Tweet
		getTweets: 'tweet.get_tweets'
	}
}
