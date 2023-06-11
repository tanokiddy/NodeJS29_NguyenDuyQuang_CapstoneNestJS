import { PrismaClient, users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { FilteredUser } from 'src/types/user';
import { UserLogin } from 'src/types/user/userOOP';

const prisma = new PrismaClient();

export const userModel = {
  signUp: async (data: users):Promise<null | users> => {
    const user: users = await prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      const hashedPW = await bcrypt.hash(data.pass_word.toString(), 10);
      const newData = {
        ...data,
        pass_word: hashedPW,
      };
      const user = await prisma.users.create({ data: newData });
      return user;
    } else {
      return null
    }
  },
  login: async (data: UserLogin):Promise<FilteredUser | null> => {
    const user: users = await prisma.users.findFirst({
      where: {
        email: data.email
      }
    })
    if(user){
      const decodePW = await bcrypt.compare(data.pass_word.toString(), user.pass_word)
      if(decodePW){
        const {pass_word: _,...filteredUser } = user
        return filteredUser
      } else {
        return null
      }
    } else {
      return null
    }
  }
};
