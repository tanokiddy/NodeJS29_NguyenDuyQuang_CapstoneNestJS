import { PrismaClient, comments } from '@prisma/client';
import { CommentDetail } from 'src/types/comment';

const prisma = new PrismaClient();

export const commentModel = {
  addComment: async (data: CommentDetail): Promise<comments | null> => {
    const checkUser = await prisma.users.findFirst({
      where: {
        id: data.user_id,
      },
    });
    const checkRoom = await prisma.rooms.findFirst({
      where: {
        id: data.room_id,
      },
    });
    if (checkRoom && checkUser) {
      const comment = await prisma.comments.create({ data });
      return comment;
    }
  },

  getAllComment: async (): Promise<comments[]> => {
    const allComments = await prisma.comments.findMany();
    return allComments;
  },

  getAllCommentByUserId: async (userId: number): Promise<comments[] | null> => {
    const checkUser = await prisma.comments.findFirst({
      where: {
        user_id: userId,
      },
    });
    if (checkUser) {
      const comments = await prisma.comments.findMany({
        where: {
          user_id: userId,
        },
      });
      return comments;
    } else {
      return null;
    }
  },

  getAllCommentByRoomId: async (roomId: number): Promise<comments[] | null> => {
    const checkRoom = await prisma.comments.findFirst({
      where: {
        room_id: roomId,
      },
    });
    if (checkRoom) {
      const comments = await prisma.comments.findMany({
        where: {
          room_id: roomId,
        },
      });
      return comments;
    } else {
      return null;
    }
  },

  editCommentById: async (
    id: number,
    data: CommentDetail,
  ): Promise<comments | null> => {
    const checkComment = await prisma.comments.findFirst({
      where: {
        id,
      },
    });
    const checkUser = await prisma.users.findFirst({
      where: {
        id: data.user_id,
      },
    });
    const checkRoom = await prisma.rooms.findFirst({
      where: {
        id: data.room_id,
      },
    });
    if (checkComment && checkRoom && checkUser) {
      const comment = await prisma.comments.update({
        data,
        where: {
          id,
        },
      });
      return comment;
    } else {
      return null;
    }
  },

  deleteCommentById: async (id: number): Promise<comments | null> => {
    const checkComment = await prisma.comments.findFirst({
      where: {
        id,
      },
    });
    if (checkComment) {
      const comment = await prisma.comments.delete({
        where: {
          id,
        },
      });
      return comment;
    } else {
      return null;
    }
  },
};
