import { PrismaClient, rooms } from '@prisma/client';
import { RoomDetail } from 'src/types/room';
import * as fs from 'fs';
import { SearchQueries } from 'src/types/location';
const prisma = new PrismaClient();

export const roomModel = {
  addRoom: async (
    data: RoomDetail,
    file: Express.Multer.File,
  ): Promise<rooms | null> => {
    const checkRoom = await prisma.rooms.findFirst({
      where: {
        room_name: data.room_name,
      },
    });
    if (!checkRoom) {
      const room = await prisma.rooms.create({
        data,
      });
      return room;
    } else {
      fs.unlinkSync(file.path);
      return null;
    }
  },

  getAllRoom: async (): Promise<rooms[]> => {
    const rooms = await prisma.rooms.findMany();
    return rooms;
  },

  updateRoomById: async (
    id: number,
    data: RoomDetail,
    file: Express.Multer.File,
  ): Promise<rooms | null> => {
    const checkRoom = await prisma.rooms.findFirst({
      where: {
        id,
      },
    });
    if (checkRoom) {
      const newRoom = await prisma.rooms.update({
        data,
        where: {
          id,
        },
      });
      const oldPath = file.path.replace(newRoom.image, checkRoom.image);
      fs.unlinkSync(oldPath);
      return newRoom;
    } else {
      fs.unlinkSync(file.path);
      return null;
    }
  },

  getRoomById: async (id: number): Promise<rooms | null> => {
    const room = await prisma.rooms.findFirst({
      where: {
        id,
      },
    });
    if (room) {
      return room;
    } else {
      return null;
    }
  },

  getRoomByLocationId: async (id: number): Promise<rooms | null> => {
    const room = await prisma.rooms.findFirst({
      where: {
        location_id: id,
      },
    });
    if (room) {
      return room;
    } else {
      return null;
    }
  },

  deleteRoomById: async (id: number): Promise<rooms | null> => {
    const room = await prisma.rooms.findFirst({
      where: {
        id,
      },
    });
    if (room) {
      await prisma.rooms.delete({
        where: {
          id,
        },
      });
      return room;
    } else {
      null;
    }
  },

  findRoomByKeyword: async ({
    pageIndex = 1,
    pageSize = 5,
    keyword = '',
    orderBy = 'asc',
  }: SearchQueries): Promise<rooms[] | null> => {
    const room = prisma.rooms.findMany({
      skip: (pageIndex - 1) * pageSize,
      take: Number(pageSize),
      where: {
        room_name: {
          contains: keyword,
        },
      },
      orderBy: {
        room_name: orderBy,
      },
    });
    if (room) {
      return room;
    } else {
      return null;
    }
  },
};
