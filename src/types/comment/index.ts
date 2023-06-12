import { comments } from "@prisma/client";

export interface CommentDetail extends Omit<comments, 'id'> {
    id?: number
}