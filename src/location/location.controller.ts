import { JwtService } from '@nestjs/jwt';
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDetail, SearchLocationQueries } from 'src/types/location';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Location,
  LocationQueriesClass,
} from 'src/types/location/locationOOP';
import { responseMessage } from 'src/utils';
import { Request, Response } from 'express';
import { resModel } from 'src/model/resModel';

@ApiTags('Location')
@UseGuards(AuthGuard('jwt'))
@Controller('location')
export class LocationController {
  constructor(
    private locationService: LocationService,
    private jwtService: JwtService,
  ) {}

  //Upload location
  @UseInterceptors(
    FileInterceptor('imageUpload', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, Date.now() + '_' + file.originalname),
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: Location })
  @Post('upload-location')
  async uploadLocation(
    @Body() data: LocationDetail,
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = this.jwtService.decode(req.cookies.UUID);
    const { id: user_id } = user['data'];
    const newData = {
      ...data,
      user_id,
      image: file.filename,
    };
    const fn = () => this.locationService.uploadLocation(newData, file);
    await responseMessage(res, fn, "Location's name have existed");
  }

  //Get all locations
  @Get('get-all-location')
  async getAllLocation(@Res() res: Response) {
    const fn = this.locationService.getAllLocation;
    await responseMessage(res, fn);
  }

  //update location
  @UseInterceptors(
    FileInterceptor('imageUpload', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, Date.now() + '_' + file.originalname),
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: Location })
  @Put('update-location')
  async updateLocation(
    @Req() req: Request,
    @Body() data: LocationDetail,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = this.jwtService.decode(req.cookies.UUID);
    const { id: user_id } = user['data'];
    const { id: _, ...data1 } = data;
    const newData = {
      ...data1,
      image: file.filename,
      user_id,
    };
    const fn = () => this.locationService.updateLocation(data.id, newData);
    await responseMessage(res, fn);
  }

  //Find location by keyword
  @ApiQuery({ type: LocationQueriesClass })
  @Get('find-location')
  async findLocation(
    @Res() res: Response,
    @Query() data: SearchLocationQueries,
  ) {
    const fn = () => this.locationService.findLocation(data);
    await responseMessage(res, fn);
  }

  // Find location by id
  @ApiParam({
    name: "location id"
  })
  @Get('get-location/:id')
  async findLocationById(@Res() res: Response, @Param() { id }) {
    const fn = () => this.locationService.findLocationById(Number(id));
    await responseMessage(res, fn);
  }

  //Delete location by id
  @ApiParam({
    name: "location id"
  })
  @Delete('delete-location/:id')
  async deleteLocationById(@Res() res: Response, @Param() {id}) {
    const fn = () => this.locationService.deleteLocationById(Number(id))
    await responseMessage(res, fn, '', resModel.NOT_FOUND())
  }
}
