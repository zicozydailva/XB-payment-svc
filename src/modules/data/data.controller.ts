import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { DataService } from './data.service';
import { AuthGuard } from 'src/common/guards';
import { User } from 'src/common/decorators';
import { IUser } from 'src/interfaces/user.interface';
import { IResponse } from 'src/interfaces';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('balance')
  async checkDataBalance(@User() user: IUser): Promise<IResponse<any>> {
    const res = await this.dataService.checkDataBalance(user.id);

    return {
      data: res,
      message: 'Data Balance Checked successfully',
      status: HttpStatus.OK,
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('purchase')
  async purchaseData(
    @User() user: IUser,
    @Query('amount') amount: number,
  ): Promise<IResponse<any>> {
    const res = await this.dataService.handleDataPurchase(
      user.id,
      Number(amount),
    );

    return {
      data: res,
      message: 'Data Balance Checked successfully',
      status: HttpStatus.OK,
    };
  }
}
