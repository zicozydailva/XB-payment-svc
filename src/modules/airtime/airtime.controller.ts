import { Controller, Get, Post, Query } from '@nestjs/common';
import { AirtimeService } from './airtime.service';

@Controller('airtime')
export class AirtimeController {
  constructor(private readonly airtimeService: AirtimeService) {}

  @Get('balance')
  checkBalance(@Query('userId') userId: string): number {
    return this.airtimeService.checkBalance(userId);
  }

  @Post('purchase')
  async purchaseAirtime(
    @Query('userId') userId: string,
    @Query('amount') amount: number,
  ): Promise<number> {
    return this.airtimeService.handleAirtimePurchase(userId, Number(amount));
  }
}
