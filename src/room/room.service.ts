import { Injectable } from '@nestjs/common';
import { rooms } from '@prisma/client';
import { roomModel } from 'src/model/roomModel';
import { SearchQueries } from 'src/types/location';
import { RoomDetail } from 'src/types/room';

@Injectable()
export class RoomService {
  async addRoom(data: RoomDetail, file: Express.Multer.File): Promise<rooms | null> {
    return await roomModel.addRoom(data, file);
  }

  async getAllRoom():Promise<rooms[]> {
    return await roomModel.getAllRoom()
  }

  async updateRoomById(id: number, data: RoomDetail,
    file: Express.Multer.File):Promise<rooms | null> {
    return await roomModel.updateRoomById(id, data, file)
  }

  async getRoomById(id:number):Promise<rooms | null> {
    return await roomModel.getRoomById(id)
  }

  async getRoomByLocationId(id:number):Promise<rooms | null> {
    return await roomModel.getRoomByLocationId(id)
  }

  async deleteRoomById(id:number):Promise<rooms | null> {
    return await roomModel.deleteRoomById(id)
  }

  async findRoomByKeyword(data: SearchQueries):Promise<rooms[] | null>{
    return await roomModel.findRoomByKeyword(data)
  }
}
