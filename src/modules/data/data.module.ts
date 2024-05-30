import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TokenHelper } from 'src/utils';
import { AuthService } from '../auth/auth.service';
import { Data } from './entities/data.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Data])],
  controllers: [DataController],
  providers: [DataService, AuthService, TokenHelper],
})
export class DataModule {}
