import { Controller, Get, Post, Query } from '@nestjs/common';

import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('balance')
  checkDataBalance(@Query('userId') userId: string): number {
    return this.dataService.checkDataBalance(userId);
  }

  @Post('purchase')
  async purchaseData(
    @Query('userId') userId: string,
    @Query('amount') amount: number,
  ): Promise<number> {
    return this.dataService.handleDataPurchase(userId, Number(amount));
  }
}
