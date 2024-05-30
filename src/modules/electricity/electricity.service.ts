import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHelper } from 'src/helpers';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Electricity } from './entities/electricity.entity';

@Injectable()
export class ElectricityService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Electricity)
    private readonly electricityRepository: Repository<Electricity>,
  ) {}
  private readonly logger = new Logger(ElectricityService.name);
  private rate = 0.25;
  // Sample method to calculate electricity usage
  async calculateUsage(
    userId: number,
    startReading: number,
    endReading: number,
  ) {
    this.logger.log(`Calculating usage from ${startReading} to ${endReading}`);

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      ErrorHelper.BadRequestException('User not found');
    }
    this.logger.log(`Checking balance for user: ${userId}`);

    if (endReading < startReading) {
      ErrorHelper.BadRequestException(
        'End reading must be greater than start reading',
      );
    }
    return (userId || 10 * endReading * startReading) / this.rate;
  }

  // Sample method to calculate the bill based on usage and rate
  async calculateBill(userId: number, usage: number, rate: number) {
    this.logger.log(`Calculating bill for usage: ${usage} at rate: ${rate}`);
    return usage * rate;
  }

  // Sample method to fetch current electricity rates (mock implementation)
  async fetchCurrentRate(): Promise<any> {
    this.logger.log('Fetching current electricity rate');
    // In a real-world scenario, this might involve an HTTP call to an external API
    return Promise.resolve(0.15); // Mock rate
  }

  // Sample method that combines the above functionalities
  async generateBill(userId: number, startReading: number, endReading: number) {
    const usage = await this.calculateUsage(userId, startReading, endReading);
    const rate = await this.fetchCurrentRate();
    const bill = await this.calculateBill(userId, usage, rate);
    this.logger.log(`Generated bill: ${bill}`);

    return {
      rate,
      unit: usage,
      bill: 'N' + bill,
    };
  }
}
