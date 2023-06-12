import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { rooms } from '@prisma/client';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { responseMessage } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RoomDetail } from 'src/types/room/roomOOP';
import { resModel } from 'src/model/resModel';
import { SearchQueries } from 'src/types/location';
import { SearchQueriesClass } from 'src/types/location/locationOOP';
@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(
    private roomService: RoomService,
    private jwtService: JwtService,
  ) {}
  //Add room
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: RoomDetail })
  @UseInterceptors(
    FileInterceptor('imageUpload', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img/room',
        filename: (req, file, callback) =>
          callback(null, Date.now() + '_' + file.originalname),
      }),
    }),
  )
  @Post('add-room')
  async addRoom(
    @Body() data: rooms,
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = this.jwtService.decode(req.cookies.UUID);
    const { id: user_id } = user['data'];
    const { id: _, ...filteredData } = data;
    const changeTypeProp = (data: boolean | string) => {
      return typeof data !== 'boolean'
        ? Number(data) === 0
          ? false
          : true
        : data;
    };
    const newData = {
      ...filteredData,
      location_id: +filteredData.location_id,
      guest_number: +filteredData.guest_number,
      bed_room: +filteredData.bed_room,
      bed: +filteredData.bed,
      bath_room: +filteredData.bath_room,
      price: +filteredData.price,
      washer: changeTypeProp(filteredData.washer),
      iron: changeTypeProp(filteredData.iron),
      television: changeTypeProp(filteredData.television),
      air_conditioner: changeTypeProp(filteredData.air_conditioner),
      wifi: changeTypeProp(filteredData.wifi),
      kitchen: changeTypeProp(filteredData.kitchen),
      car_park: changeTypeProp(filteredData.car_park),
      spool: changeTypeProp(filteredData.spool),
      flat_iron: changeTypeProp(filteredData.flat_iron),
      user_id,
      image: file.filename,
    };
    const fn = () => this.roomService.addRoom(newData, file);
    await responseMessage(res, fn, "Room's name have existed");
  }

  //Get all room
  @Get('get-rooms')
  async getAllRoom(@Res() res: Response) {
    const fn = () => this.roomService.getAllRoom();
    await responseMessage(res, fn);
  }

  //Update room by id
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: RoomDetail })
  @ApiParam({ name: 'roomId' })
  @UseInterceptors(
    FileInterceptor('imageUpload', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img/room',
        filename: (req, file, callback) =>
          callback(null, Date.now() + '_' + file.originalname),
      }),
    }),
  )
  @Put('update-room/:id')
  async updateRoomById(
    @Req() req: Request,
    @Res() res: Response,
    @Body() data: rooms,
    @UploadedFile() file: Express.Multer.File,
    @Param() param: { id: string },
  ) {
    const { id } = param;
    const user = this.jwtService.decode(req.cookies.UUID);
    const { id: user_id } = user['data'];
    const { id: _, ...filteredData } = data;
    const changeTypeProp = (data: boolean | string) => {
      return typeof data !== 'boolean'
        ? Number(data) === 0
          ? false
          : true
        : data;
    };
    const newData = {
      ...filteredData,
      location_id: +filteredData.location_id,
      guest_number: +filteredData.guest_number,
      bed_room: +filteredData.bed_room,
      bed: +filteredData.bed,
      bath_room: +filteredData.bath_room,
      price: +filteredData.price,
      washer: changeTypeProp(filteredData.washer),
      iron: changeTypeProp(filteredData.iron),
      television: changeTypeProp(filteredData.television),
      air_conditioner: changeTypeProp(filteredData.air_conditioner),
      wifi: changeTypeProp(filteredData.wifi),
      kitchen: changeTypeProp(filteredData.kitchen),
      car_park: changeTypeProp(filteredData.car_park),
      spool: changeTypeProp(filteredData.spool),
      flat_iron: changeTypeProp(filteredData.flat_iron),
      user_id,
      image: file.filename,
    };
    const fn = () => this.roomService.updateRoomById(Number(id), newData, file);
    await responseMessage(res, fn);
  }

  //Get room by id
  @ApiParam({ name: 'id' })
  @Get('get-room/:id')
  async getRoomById(@Res() res: Response, @Param() param: { id: string }) {
    const { id } = param;
    const fn = () => this.roomService.getRoomById(Number(id));
    await responseMessage(res, fn, '', resModel.NOT_FOUND());
  }

  //Get room by location id
  @ApiParam({ name: 'locationId' })
  @Get('get-room/:locationId')
  async getRoomByLocationId(
    @Res() res: Response,
    @Param() param: { locationId: string },
  ) {
    const { locationId } = param;
    const fn = () => this.roomService.getRoomByLocationId(Number(locationId));
    await responseMessage(res, fn, '', resModel.NOT_FOUND());
  }

  //Delete room by id
  @ApiParam({ name: 'id' })
  @Delete('delete-room/:id')
  async deleteRoomById(@Res() res: Response, @Param() param: { id: string }) {
    const { id } = param;
    const fn = () => this.roomService.deleteRoomById(Number(id));
    await responseMessage(res, fn, '', resModel.NOT_FOUND());
  }

  //Find room by keyword
  @ApiQuery({ type: SearchQueriesClass })
  @Get('find-room')
  async findRoomByKeyword(@Res() res: Response, @Query() data: SearchQueries) {
    const fn = () => this.roomService.findRoomByKeyword(data);
    await responseMessage(res, fn, '', resModel.NOT_FOUND());
  }
}
