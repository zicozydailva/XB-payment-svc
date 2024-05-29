import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElectricityModule } from './modules/electricity/electricity.module';
import { AirtimeModule } from './modules/airtime/airtime.module';
import { DataModule } from './modules/data/data.module';
import { Airtime } from './modules/airtime/entities/airtime.entity';
import { Data } from './modules/data/entities/data.entity';
import { Electricity } from './modules/electricity/entities/electricity.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Ensures ConfigModule is available globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Airtime, Data, Electricity],
        synchronize: true, // Be careful with this option in production
      }),
    }),
    UserModule,
    ElectricityModule,
    AirtimeModule,
    DataModule,
  ],
})
export class AppModule {}
