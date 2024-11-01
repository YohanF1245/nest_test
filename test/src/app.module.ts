import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports:  [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: 'postgres',
        password: 'root',
        database: 'testnest',
        entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
        synchronize: true
      })
    }),
    CitiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
