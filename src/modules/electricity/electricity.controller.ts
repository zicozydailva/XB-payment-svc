import { Controller, Get, Query } from '@nestjs/common';
import { ElectricityService } from './electricity.service';

@Controller('electricity')
export class ElectricityController {
  constructor(private readonly electricityService: ElectricityService) {}

  @Get('usage')
  calculateUsage(
    @Query('startReading') startReading: number,
    @Query('endReading') endReading: number,
  ): number {
    return this.electricityService.calculateUsage(
      Number(startReading),
      Number(endReading),
    );
  }

  @Get('bill')
  async generateBill(
    @Query('startReading') startReading: number,
    @Query('endReading') endReading: number,
  ): Promise<number> {
    return this.electricityService.generateBill(
      Number(startReading),
      Number(endReading),
    );
  }
}
