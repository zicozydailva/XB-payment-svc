import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorHelper } from 'src/helpers';
import { Airtime } from './entities/airtime.entity';
import { PaymentMethod, Status } from 'src/enums/payment.enum';

@Injectable()
export class AirtimeService {
  private readonly logger = new Logger(AirtimeService.name);
  private balances: { [key: string]: number } = {};

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Airtime)
    private readonly airtimeRepository: Repository<Airtime>,
  ) {}

  // Method to check the balance of a user
  checkBalance(userId: string): number {
    this.logger.log(`Checking balance for user: ${userId}`);
    return this.balances[userId] || 0;
  }

  // Method to purchase airtime for a user
  async purchaseAirtime(userId: number, amount: number) {
    this.logger.log(`Purchasing airtime of ${amount} for user: ${userId}`);

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      ErrorHelper.BadRequestException('User not found');
    }

    const airtime = this.airtimeRepository.create({
      amount,
      purchasedAt: new Date(),
      paymentMethod: PaymentMethod.CREDIT_CARD, // to be modifed
      status: Status.PENDING, // to be modifed
      user,
    });

    await this.airtimeRepository.save(airtime);

    user.airtimeBalance = (user.airtimeBalance || 0) + amount;

    await this.userRepository.save(user);

    return {
      topup_value: amount,
      current_balance: user.airtimeBalance,
      status: Status.COMPLETED,
    };
  }

  private async purchaseAirtimeFromProvider(
    userId: number,
    amount: number,
  ): Promise<boolean> {
    this.logger.log(
      `Purchasing airtime of ${amount} from provider for user: ${userId}`,
    );

    // In a real-world scenario, this might involve an HTTP call to an external API
    return Promise.resolve(true); // Mock response
  }

  async handleAirtimePurchase(userId: number, amount: number) {
    const purchaseSuccessful = await this.purchaseAirtimeFromProvider(
      userId,
      amount,
    );
    if (purchaseSuccessful) {
      return await this.purchaseAirtime(userId, amount);
    } else {
      ErrorHelper.BadRequestException('Airtime purchase from provider failed');
    }
  }
}
