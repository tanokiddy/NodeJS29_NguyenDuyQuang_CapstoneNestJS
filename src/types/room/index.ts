import { rooms } from "@prisma/client";

export interface RoomDetail extends Omit<rooms, 'id'> {
    id?: number
}