import { TypeOrmModule } from '@nestjs/typeorm'

export const DatabaseConnection = (databaseName: string) =>
	TypeOrmModule.forRoot({
		type: 'postgres',
		host: process.env.DATABASE_HOST || 'localhost',
		port: parseInt(process.env.DATABASE_PORT || '5432', 10),
		username: process.env.DATABASE_USER || 'test_postgre',
		password: process.env.DATABASE_PASSWORD || 'test_password',
		database: databaseName,
		autoLoadEntities: true,
		synchronize: true
	})
