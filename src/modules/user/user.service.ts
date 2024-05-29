import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    this.logger.log(`Creating user ${JSON.stringify(createUserDto)}`);
    const exist = await this.userRepository.findOne({
      where: {
        id: createUserDto.user_id,
      },
      withDeleted: true,
    });

    if (exist) {
      return exist;
    }

    const user = await this.userRepository.save({
      ...createUserDto,
    });

    this.logger.log(`User created ${JSON.stringify(user)}`);

    return user;
  }

  async delete(deleteUserDto: DeleteUserDto) {
    this.logger.log(`Deleting user ${JSON.stringify(deleteUserDto)}`);
    const exist = await this.userRepository.findOne({
      where: {
        id: deleteUserDto.id,
      },
    });

    if (!exist) {
      this.logger.log('User Already Deleted');
    }

    const user = await this.userRepository.softDelete(deleteUserDto);
    this.logger.log(`User Deleted ${JSON.stringify(user)}`);

    return user;
  }
}
