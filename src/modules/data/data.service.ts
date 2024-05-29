import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DataService {
  private readonly logger = new Logger(DataService.name);
  private dataBalances: { [key: string]: number } = {};

  // Method to check the data balance of a user
  checkDataBalance(userId: string): number {
    this.logger.log(`Checking data balance for user: ${userId}`);
    return this.dataBalances[userId] || 0;
  }

  // Method to purchase data for a user
  purchaseData(userId: string, amount: number): number {
    this.logger.log(`Purchasing data of ${amount}MB for user: ${userId}`);
    if (!this.dataBalances[userId]) {
      this.dataBalances[userId] = 0;
    }
    this.dataBalances[userId] += amount;
    return this.dataBalances[userId];
  }

  // Method to interact with an external API to purchase data (mock implementation)
  async purchaseDataFromProvider(
    userId: string,
    amount: number,
  ): Promise<boolean> {
    this.logger.log(
      `Purchasing data of ${amount}MB from provider for user: ${userId}`,
    );
    // In a real-world scenario, this might involve an HTTP call to an external API
    return Promise.resolve(true); // Mock response
  }

  // Method to handle the full data purchase process
  async handleDataPurchase(userId: string, amount: number): Promise<number> {
    const purchaseSuccessful = await this.purchaseDataFromProvider(
      userId,
      amount,
    );
    if (purchaseSuccessful) {
      return this.purchaseData(userId, amount);
    } else {
      throw new Error('Data purchase from provider failed');
    }
  }
}
