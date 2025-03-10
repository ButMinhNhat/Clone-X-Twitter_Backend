import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'

import { UserResolvers } from './resolvers/user.resolver'

@Module({
	imports: [
		// Config
		ConfigModule.forRoot({ isGlobal: true }),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true
		}),

		// Resolvers
		UserResolvers
	]
})
export class Gateway {}
