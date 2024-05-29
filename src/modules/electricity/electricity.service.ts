import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ElectricityService {
  private readonly logger = new Logger(ElectricityService.name);

  // Sample method to calculate electricity usage
  calculateUsage(startReading: number, endReading: number): number {
    this.logger.log(`Calculating usage from ${startReading} to ${endReading}`);
    if (endReading < startReading) {
      throw new Error('End reading must be greater than start reading');
    }
    return endReading - startReading;
  }

  // Sample method to calculate the bill based on usage and rate
  calculateBill(usage: number, rate: number): number {
    this.logger.log(`Calculating bill for usage: ${usage} at rate: ${rate}`);
    return usage * rate;
  }

  // Sample method to fetch current electricity rates (mock implementation)
  async fetchCurrentRate(): Promise<number> {
    this.logger.log('Fetching current electricity rate');
    // In a real-world scenario, this might involve an HTTP call to an external API
    return Promise.resolve(0.15); // Mock rate
  }

  // Sample method that combines the above functionalities
  async generateBill(
    startReading: number,
    endReading: number,
  ): Promise<number> {
    const usage = this.calculateUsage(startReading, endReading);
    const rate = await this.fetchCurrentRate();
    const bill = this.calculateBill(usage, rate);
    this.logger.log(`Generated bill: ${bill}`);
    return bill;
  }
}
