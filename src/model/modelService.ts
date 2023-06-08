import { PrismaClient, users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export const models = {
  signUp: async (data: users) => {
    const hashedPW = await bcrypt.hash(data.pass_word, 10);
    const newData = {
      ...data,
      pass_word: hashedPW,
    };
    await prisma.users.create({ data: newData });
  },
};
