import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { models } from 'src/model/modelService';

@Injectable()
export class UserService {
  async signUp(data: users) {
    await models.signUp(data);
  }
}
