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
import { User } from 'src/common/decorators';
import { IUser } from 'src/interfaces/user.interface';

@Controller('airtime')
export class AirtimeController {
  constructor(private readonly airtimeService: AirtimeService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('balance')
  async checkBalance(@User() user: IUser) {
    const res = await this.airtimeService.checkBalance(user.id);

    return {
      data: res,
      message: 'Airtime Balance Checked successfully',
      status: HttpStatus.OK,
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('purchase')
  async purchaseAirtime(@User() user: IUser, @Query('amount') amount: number) {
    const res = await this.airtimeService.handleAirtimePurchase(
      user.id,
      Number(amount),
    );

    return {
      data: res,
      message: 'Airtime Purchased successfully',
      status: HttpStatus.OK,
    };
  }
}
