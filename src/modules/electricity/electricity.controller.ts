import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ElectricityService } from './electricity.service';
import { AuthGuard } from 'src/common/guards';
import { IUser } from 'src/interfaces/user.interface';
import { User } from 'src/common/decorators';
import { IResponse } from 'src/interfaces';

@Controller('electricity')
export class ElectricityController {
  constructor(private readonly electricityService: ElectricityService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('usage')
  async calculateUsage(
    @User() user: IUser,
    @Query('startReading') startReading: number,
    @Query('endReading') endReading: number,
  ): Promise<IResponse<any>> {
    const res = await this.electricityService.calculateUsage(
      user.id,
      Number(startReading),
      Number(endReading),
    );

    return {
      data: res,
      message: 'Electricity Usage Calculated successfully',
      status: HttpStatus.OK,
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('bill')
  async generateBill(
    @User() user: IUser,
    @Query('startReading') startReading: number,
    @Query('endReading') endReading: number,
  ): Promise<any> {
    const res = await this.electricityService.generateBill(
      user.id,
      Number(startReading),
      Number(endReading),
    );

    return {
      data: res,
      message: 'Electricity Bill Generated successfully',
      status: HttpStatus.OK,
    };
  }
}
