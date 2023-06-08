import { PrismaClient, users } from '@prisma/client';
const prisma = new PrismaClient();

export const models = {
  signUp: async (data: users) => {
    const user: users = await prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return true;
    } else {
      return false;
    }
  },
};
