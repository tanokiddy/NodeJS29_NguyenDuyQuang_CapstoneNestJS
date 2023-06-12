import { PrismaClient, users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SearchQueries } from 'src/types/location';
import { FilteredUser, UserUpdate } from 'src/types/user';
import { UserLogin } from 'src/types/user/userOOP';

const prisma = new PrismaClient();

export const userModel = {
  signUp: async (data: users): Promise<null | users> => {
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
      return null;
    }
  },
  login: async (data: UserLogin): Promise<FilteredUser | null> => {
    const user: users = await prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });
    if (user) {
      const decodePW = await bcrypt.compare(
        data.pass_word.toString(),
        user.pass_word,
      );
      if (decodePW) {
        const { pass_word: _, ...filteredUser } = user;
        return filteredUser;
      } else {
        return null;
      }
    } else {
      return null;
    }
  },

  //Admin features
  getAllUser: async (): Promise<users[]> => {
    const allUser = await prisma.users.findMany();
    return allUser;
  },

  getUserByKeyword: async ({
    pageIndex = 1,
    pageSize = 5,
    keyword = '',
    orderBy = 'asc',
  }: SearchQueries): Promise<users[] | null> => {
    const users = prisma.users.findMany({
      skip: (pageIndex - 1) * pageSize,
      take: Number(pageSize),
      where: {
        name: {
          contains: keyword,
        },
      },
      orderBy: {
        name: orderBy,
      },
    });
    if (users) {
      return users;
    } else {
      return null;
    }
  },

  getUserById: async (id: number): Promise<users | null> => {
    const checkUser = await prisma.users.findFirst({
      where: {
        id,
      },
    });
    if (checkUser) {
      return checkUser;
    } else {
      return null;
    }
  },

  updateUserById: async (
    id: number,
    data: UserUpdate,
  ): Promise<FilteredUser | null> => {
    const checkUser = await prisma.users.findFirst({
      where: {
        id,
      },
    });
    const checkPW = await bcrypt.compare(
      data.old_pw.toString(),
      checkUser.pass_word,
    );
    if (checkUser && checkPW) {
      const {old_pw: _,...filteredUser} = data
      const hashedPW = await bcrypt.hash(filteredUser.pass_word.toString(), 10);
      const newData = {
        ...filteredUser,
        pass_word: hashedPW
      }
      const user = await prisma.users.update({
        data: newData,
        where: {
          id
        }
      })
      const {pass_word: __,...newUser} = user
      return newUser
    } else {
      return null;
    }
  },

  deleteUserById: async (id: number): Promise<users | null> => {
    const checkUser = await prisma.users.findFirst({
      where: {
        id,
      },
    });
    if (checkUser) {
      const user = await prisma.users.delete({
        where: {
          id,
        },
      });
      return user;
    } else {
      return null;
    }
  },
};
