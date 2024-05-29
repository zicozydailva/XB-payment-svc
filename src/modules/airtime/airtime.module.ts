import { Module } from '@nestjs/common';
import { AirtimeService } from './airtime.service';
import { AirtimeController } from './airtime.controller';
import { AuthService } from '../auth/auth.service';
import { TokenHelper } from 'src/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Airtime } from './entities/airtime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Airtime])],
  controllers: [AirtimeController],
  providers: [AirtimeService, AuthService, TokenHelper],
})
export class AirtimeModule {}
