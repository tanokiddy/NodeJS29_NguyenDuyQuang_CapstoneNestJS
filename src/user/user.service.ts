import { userModel } from './../model/userModel';
import { Injectable } from '@nestjs/common';
import { PrismaClient, users } from '@prisma/client';

@Injectable()
export class UserService {
  prisma = new PrismaClient();
  async signUp(data: users) :Promise<false | users>{
    return await userModel.signUp(data)
  }
}
