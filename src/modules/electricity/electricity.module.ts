import { Module } from '@nestjs/common';
import { ElectricityService } from './electricity.service';
import { ElectricityController } from './electricity.controller';

@Module({
  controllers: [ElectricityController],
  providers: [ElectricityService],
})
export class ElectricityModule {}
