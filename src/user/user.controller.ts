import { Controller, Get, Post, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { users } from '@prisma/client';
import { models } from 'src/model/modelController';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async signUp(data: users) {
    try {
      await models.signUp(data);
      return data;
    } catch (err) {
      throw new NotFoundException(404, 'your email or password is incorrect');
    }
  }
}
