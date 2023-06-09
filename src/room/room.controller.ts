import { Controller, Post } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  
  @Post('upload-room')
  async uploadRoom(){
    
    return 
  }
}
