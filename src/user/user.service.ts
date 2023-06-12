import { userModel } from './../model/userModel';
import { Injectable } from '@nestjs/common';
import { PrismaClient, users } from '@prisma/client';
import { SearchQueries } from 'src/types/location';
import { FilteredUser, UserUpdate } from 'src/types/user';
import { UserLogin } from 'src/types/user/userOOP';

@Injectable()
export class UserService {
  prisma = new PrismaClient();
  async signUp(data: users): Promise<null | users> {
    return await userModel.signUp(data);
  }

  async login(data: UserLogin) {
    return await userModel.login(data);
  }

  async getAllUser(): Promise<users[]> {
    return await userModel.getAllUser();
  }

  async getUserByKeyword(data: SearchQueries): Promise<users[] | null> {
    return await userModel.getUserByKeyword(data);
  }

  async getUserById(id: number): Promise<users | null> {
    return await userModel.getUserById(id);
  }

  async updateUserById(id: number, data: UserUpdate): Promise<FilteredUser | null> {
    return await userModel.updateUserById(id, data);
  }
  
  async deleteUserById(id: number): Promise<users | null> {
    return await userModel.deleteUserById(id);
  }
}
