import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { USER_CREATED, USER_UPDATED } from 'src/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern(USER_CREATED)
  create(@Payload() createUserDto: any) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @UsePipes(new ValidationPipe())
  @EventPattern(USER_UPDATED)
  delete(@Payload() deleteUserDto: any) {
    console.log(deleteUserDto);
    return this.userService.delete(deleteUserDto);
  }
}
