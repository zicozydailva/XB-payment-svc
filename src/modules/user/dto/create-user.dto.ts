import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  user_id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;
}
