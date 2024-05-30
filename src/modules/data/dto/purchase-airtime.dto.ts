import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddAirtimeDto {
  @IsNotEmpty({ message: 'User ID is required' })
  @IsNumber()
  userId: number;

  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber({}, { message: 'Amount must be a number' })
  amount: number;
}
