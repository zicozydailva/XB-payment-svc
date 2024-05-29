import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AirtimeService {
  private readonly logger = new Logger(AirtimeService.name);
  private balances: { [key: string]: number } = {};

  // Method to check the balance of a user
  checkBalance(userId: string): number {
    this.logger.log(`Checking balance for user: ${userId}`);
    return this.balances[userId] || 0;
  }

  // Method to purchase airtime for a user
  purchaseAirtime(userId: string, amount: number): number {
    this.logger.log(`Purchasing airtime of ${amount} for user: ${userId}`);
    if (!this.balances[userId]) {
      this.balances[userId] = 0;
    }
    this.balances[userId] += amount;
    return this.balances[userId];
  }

  // Method to interact with an external API to purchase airtime (mock implementation)
  async purchaseAirtimeFromProvider(
    userId: string,
    amount: number,
  ): Promise<boolean> {
    this.logger.log(
      `Purchasing airtime of ${amount} from provider for user: ${userId}`,
    );
    // In a real-world scenario, this might involve an HTTP call to an external API
    return Promise.resolve(true); // Mock response
  }

  // Method to handle the full airtime purchase process
  async handleAirtimePurchase(userId: string, amount: number): Promise<number> {
    const purchaseSuccessful = await this.purchaseAirtimeFromProvider(
      userId,
      amount,
    );
    if (purchaseSuccessful) {
      return this.purchaseAirtime(userId, amount);
    } else {
      throw new Error('Airtime purchase from provider failed');
    }
  }
}
