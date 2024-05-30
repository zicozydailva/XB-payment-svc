import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHelper } from 'src/helpers';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Data } from './entities/data.entity';
import { PaymentMethod, Status } from 'src/enums/payment.enum';

@Injectable()
export class DataService {
  private readonly logger = new Logger(DataService.name);
  private dataBalances: { [key: number]: number } = {};
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Data)
    private readonly dataRepository: Repository<Data>,
  ) {}

  // Method to check the data balance of a user
  async checkDataBalance(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      ErrorHelper.BadRequestException('User not found');
    }
    this.logger.log(`Checking data balance for user: ${userId}`);

    return { data_balance: user.dataBalance + 'GB' };
  }

  // Method to purchase data for a user
  async purchaseData(userId: number, amount: number) {
    this.logger.log(`Purchasing data of ${amount}MB for user: ${userId}`);

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      ErrorHelper.BadRequestException('User not found');
    }

    console.log(user);
    const data = this.dataRepository.create({
      amount,
      purchasedAt: new Date(),
      paymentMethod: PaymentMethod.DEBIT_CARD, // to be modifed
      status: Status.PENDING, // to be modifed
      user,
    });

    await this.dataRepository.save(data);

    user.dataBalance = (user.dataBalance || 0) + amount;

    await this.userRepository.save(user);

    return {
      topup_value: amount,
      current_data_balance: user.dataBalance + 'GB',
      status: Status.COMPLETED,
    };
  }

  async purchaseDataFromProvider(
    userId: number,
    amount: number,
  ): Promise<boolean> {
    this.logger.log(
      `Purchasing data of ${amount}MB from provider for user: ${userId}`,
    );
    // In a real-world scenario, this might involve an HTTP call to an external API
    return Promise.resolve(true); // Mock response
  }

  async handleDataPurchase(userId: number, amount: number): Promise<any> {
    const purchaseSuccessful = await this.purchaseDataFromProvider(
      userId,
      amount,
    );

    if (purchaseSuccessful) {
      return await this.purchaseData(userId, amount);
    } else {
      ErrorHelper.BadRequestException('Data purchase from provider failed');
    }
  }
}
