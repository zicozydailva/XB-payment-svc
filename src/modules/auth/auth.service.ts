import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { IUser } from 'src/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import { TokenHelper } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private tokenHelper: TokenHelper,
    private configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async verifyToken(token: string): Promise<IUser> {
    const payload = this.tokenHelper.verify<IUser & { sessionId: string }>(
      token,
      this.configService.get('APP_SECRET'),
    );

    const user = await this.userRepository.count({
      where: {
        user_id: payload.id,
      },
    });

    if (!user) {
      await this.userRepository.upsert(
        {
          user_id: payload.id,
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
        },
        {
          conflictPaths: ['user_id'],
        },
      );
    }

    return payload;
  }
}
