import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  ReservationDetailClass,
  UserId,
} from 'src/types/reservation/reservationOOP';
import { Request, Response } from 'express';
import { ReservationDetail } from 'src/types/reservation';
import { convertDateTime, responseMessage } from 'src/utils';
import { AuthGuard } from '@nestjs/passport';
import { resModel } from 'src/model/resModel';

@ApiTags('Reservation')
@UseGuards(AuthGuard('jwt'))
@Controller('reservation')
export class ReservationController {
  constructor(
    private reservationService: ReservationService,
    private jwtService: JwtService,
  ) {}

  //Book room
  @ApiBody({ type: ReservationDetailClass })
  @Post('book-room')
  async bookRoom(
    @Res() res: Response,
    @Req() req: Request,
    @Body() data: ReservationDetail,
  ) {
    const user = this.jwtService.decode(req.cookies.UUID);
    const { id: user_id } = user['data'];
    const newData = {
      ...data,
      user_id,
      // date_in: convertDateTime(data.date_in),
      // date_out: convertDateTime(data.date_out),
    };
    const fn = () => this.reservationService.bookRoom(newData);
    await responseMessage(res, fn);
  }

  //Update reservation
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ReservationDetailClass })
  @Put('update-reservation/:id')
  async updateBookRoomById(
    @Res() res: Response,
    @Req() req: Request,
    @Body() data: ReservationDetail,
    @Param() param: { id: string },
  ) {
    const user = this.jwtService.decode(req.cookies.UUID);
    const { id: user_id } = user['data'];
    const { id } = param;
    const newData = {
      ...data,
      user_id,
      // date_in: convertDateTime(data.date_in),
      // date_out: convertDateTime(data.date_out),
    };
    const fn = () =>
      this.reservationService.updateBookRoomById(Number(id), newData);
    await responseMessage(res, fn, '', resModel.NOT_FOUND());
  }

  //Get all reservation by user id
  @ApiBody({ type: UserId })
  @Get('get-reservation-by-user')
  async getAllReservationByUserId(@Res() res: Response, @Req() req: Request) {
    const user = this.jwtService.decode(req.cookies.UUID);
    const { id: user_id } = user['data'];
    const fn = () => this.reservationService.getAllReservationByUserId(user_id);
    await responseMessage(res, fn, '', resModel.NOT_FOUND());
  }

  //Get all reservation
  @Get('get-all-reservation')
  async getAllReservation(@Res() res: Response) {
    const fn = () => this.reservationService.getAllReservation();
    await responseMessage(res, fn);
  }

  //Get all reservation by room id
  @ApiParam({ name: 'roomId' })
  @Get('get-reservation-by-room/:roomId')
  async getReservationByRoomId(
    @Res() res: Response,
    @Param() param: { roomId: string },
  ) {
    const { roomId } = param;
    const fn = () =>
      this.reservationService.getAllReservationByRoomId(Number(roomId));
    await responseMessage(res, fn, '', resModel.NOT_FOUND());
  }

  //Delete reservation
  @ApiParam({ name: 'id' })
  @Delete('delete-reservation/:id')
  async deleteReservationById(
    @Res() res: Response,
    @Param() param: { id: string },
  ) {
    const { id } = param;
    const fn = () => this.reservationService.deleteReservationById(Number(id));
    await responseMessage(res, fn);
  }
}
