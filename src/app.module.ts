import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScootersModule } from './scooters/scooters.module';
import { RentsModule } from './rents/rents.module';

@Module({
  imports: [
    UsersModule,
    ScootersModule,
    RentsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true, // 生產環境中應設為 false
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
