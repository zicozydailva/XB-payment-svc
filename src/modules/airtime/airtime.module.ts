import { Module } from '@nestjs/common';
import { AirtimeService } from './airtime.service';
import { AirtimeController } from './airtime.controller';

@Module({
  controllers: [AirtimeController],
  providers: [AirtimeService],
})
export class AirtimeModule {}
