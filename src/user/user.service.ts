import { userModel } from './../model/userModel';
import { Injectable } from '@nestjs/common';
import { PrismaClient, users } from '@prisma/client';
import { UserLogin } from 'src/types/user/userOOP';

@Injectable()
export class UserService {
  prisma = new PrismaClient();
  async signUp(data: users) :Promise<null | users>{
    return await userModel.signUp(data)
  }
  async login(data: UserLogin) {
    return await userModel.login(data)
  }
}
