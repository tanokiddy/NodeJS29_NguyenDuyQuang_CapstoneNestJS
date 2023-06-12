import { Injectable } from '@nestjs/common';
import { comments } from '@prisma/client';
import { commentModel } from 'src/model/commentModel';
import { CommentDetail } from 'src/types/comment';

@Injectable()
export class CommentService {
  async addComment(data: CommentDetail): Promise<comments | null> {
    return await commentModel.addComment(data);
  }

  async getAllComment(): Promise<comments[]> {
    return await commentModel.getAllComment();
  }

  async getAllCommentByUserId(userId: number): Promise<comments[] | null> {
    return await commentModel.getAllCommentByUserId(userId);
  }

  async getAllCommentByRoomId(roomId: number): Promise<comments[] | null> {
    return await commentModel.getAllCommentByRoomId(roomId);
  }

  async editCommentById(
    id: number,
    data: CommentDetail,
  ): Promise<comments | null> {
    return await commentModel.editCommentById(id, data);
  }

  async deleteCommentById(id: number): Promise<comments | null> {
    return await commentModel.deleteCommentById(id);
  }
}
