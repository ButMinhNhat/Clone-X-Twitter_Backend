import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { User } from './user.entity'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DATABASE_HOST || 'localhost',
			port: parseInt(process.env.DATABASE_PORT || '5432', 10),
			username: process.env.DATABASE_USER || 'test_postgre',
			password: process.env.DATABASE_PASSWORD || 'test_password',
			database: process.env.DATABASE_NAME || 'test_database',
			autoLoadEntities: true,
			synchronize: true
		}),
		TypeOrmModule.forFeature([User])
	],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
