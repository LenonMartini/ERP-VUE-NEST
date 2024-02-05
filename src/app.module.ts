import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type:'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities:[`${__dirname}/**/*.entity{.js,.ts}`],
      migrations:[`${__dirname}/migrations/{.ts,*.js}`],
      migrationsRun:true
    }), 
    UsersModule, 
    AuthModule, 
      
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
