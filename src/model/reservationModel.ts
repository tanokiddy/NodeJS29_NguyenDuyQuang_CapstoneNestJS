import { PrismaClient, reservation } from '@prisma/client';
import { ReservationDetail } from 'src/types/reservation';

const prisma = new PrismaClient();

export const reservationModel = {
  bookRoom: async (data: ReservationDetail): Promise<reservation | null> => {
    const checkReserv = await prisma.reservation.findFirst({
      where: {
        user_id: data.user_id,
        room_id: data.room_id,
      },
    });

    if (!checkReserv) {
      const reservation = await prisma.reservation.create({ data: data });
      return reservation;
    } else {
      return null;
    }
  },

  updateBookRoomById: async (
    id: number,
    data: ReservationDetail,
  ): Promise<reservation | null> => {
    const checkReserv = await prisma.reservation.findFirst({
      where: {
        id,
      },
    });
    if (checkReserv) {
      const newReserv = await prisma.reservation.update({
        data,
        where: {
          id,
        },
      });
      return newReserv;
    } else {
      return null;
    }
  },

  getAllReservationByUserId: async (
    userId: number,
  ): Promise<reservation[] | null> => {
    const checkUser = await prisma.reservation.findFirst({
        where: {
            user_id: userId,
        },
    });
    if (checkUser) {
      const allReserv = await prisma.reservation.findMany({
        where: {
          user_id: userId,
        },
      });
      return allReserv;
    } else {
      return null;
    }
  },

  getAllReservation: async () => {
    const allReserv = await prisma.reservation.findMany();
    return allReserv;
  },

  getReversationByRoomId: async (
    roomId: number,
  ): Promise<reservation | null> => {
    const checkRoom = await prisma.reservation.findFirst({
      where: {
        room_id: roomId,
      },
    });
    if (checkRoom) {
      return checkRoom;
    } else {
      return null;
    }
  },

  deleteReservationbyId: async (id: number): Promise<reservation | null> => {
    const checkReserv = await prisma.reservation.findFirst({
        where: {
            id,
        },
    });
    if (checkReserv) {
      await prisma.reservation.delete({
        where: {
          id,
        },
      });
      return checkReserv;
    } else {
      return null;
    }
  },
};
