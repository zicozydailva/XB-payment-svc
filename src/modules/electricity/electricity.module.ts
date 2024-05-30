import { Module } from '@nestjs/common';
import { ElectricityController } from './electricity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenHelper } from 'src/utils';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/entities/user.entity';
import { Electricity } from './entities/electricity.entity';
import { ElectricityService } from './electricity.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Electricity])],
  controllers: [ElectricityController],
  providers: [ElectricityService, AuthService, TokenHelper],
})
export class ElectricityModule {}
