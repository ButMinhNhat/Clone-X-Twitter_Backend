import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'

import {
	ActionResolvers,
	TweetResolvers,
	RoleResolvers,
	UserResolvers
} from './resolvers'
import { TweetClient, UserClient } from './clients'
import { AuthGuard } from '@libs/configs/guard'

@Module({
	imports: [
		// Config
		ConfigModule.forRoot({ isGlobal: true }),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true
		})
	],
	providers: [
		{ provide: APP_GUARD, useClass: AuthGuard },

		// Clients
		UserClient,
		TweetClient,

		// Resolvers
		UserResolvers,
		RoleResolvers,
		ActionResolvers,
		TweetResolvers
	]
})
export class Gateway {}
