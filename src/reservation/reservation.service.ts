import { Injectable } from '@nestjs/common';
import { reservation } from '@prisma/client';
import { reservationModel } from 'src/model/reservationModel';
import { ReservationDetail } from 'src/types/reservation';

@Injectable()
export class ReservationService {
  async bookRoom(data: ReservationDetail): Promise<reservation | null> {
    console.log("service");
    
    return await reservationModel.bookRoom(data);
  }

  async updateBookRoomById(
    id: number,
    data: ReservationDetail,
  ): Promise<reservation | null> {
    return await reservationModel.updateBookRoomById(id, data);
  }

  async getAllReservationByUserId(
    userId: number,
  ): Promise<reservation[] | null> {
    return await reservationModel.getAllReservationByUserId(userId);
  }

  async getAllReservation(): Promise<reservation[] | null> {
    return await reservationModel.getAllReservation();
  }

  async getAllReservationByRoomId(roomId: number):Promise<reservation | null> {
    return await reservationModel.getReversationByRoomId(roomId)
  }

  async deleteReservationById(id: number):Promise<reservation | null> {
    return await reservationModel.deleteReservationbyId(id)
  }
}
