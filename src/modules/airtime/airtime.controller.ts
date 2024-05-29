import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AirtimeService } from './airtime.service';
import { AuthGuard } from 'src/common/guards';

@Controller('airtime')
export class AirtimeController {
  constructor(private readonly airtimeService: AirtimeService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('balance')
  checkBalance(@Query('userId') userId: string) {
    const res = this.airtimeService.checkBalance(userId);

    return {
      data: res,
      message: 'Balance Checked successfully',
      status: HttpStatus.OK,
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('purchase')
  async purchaseAirtime(
    @Query('userId') userId: number,
    @Query('amount') amount: number,
  ) {
    const res = await this.airtimeService.handleAirtimePurchase(
      userId,
      Number(amount),
    );

    return {
      data: res,
      message: 'Airtime Purchased successfully',
      status: HttpStatus.OK,
    };
  }
}
