import { PrismaClient, users } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const userModel = {
  signUp: async (data: users):Promise<false | users> => {
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
      return false
    }
  },
};
