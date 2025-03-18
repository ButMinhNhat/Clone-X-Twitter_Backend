import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'

import { UserResolvers } from './resolvers/user.resolver'
import { AuthGuard } from './guard'

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
	],
	providers: [{ provide: APP_GUARD, useClass: AuthGuard }]
})
export class Gateway {}
