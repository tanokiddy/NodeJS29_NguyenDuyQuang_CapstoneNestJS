import { resModel } from './../model/resModel';
import { Body, Controller, InternalServerErrorException, Post, Res } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDetail } from 'src/types/location';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('upload-location')
  async uploadLocation(@Body() data: LocationDetail, @Res() res){
    try {
      const location = await this.locationService.uploadLocation(data)
      if(location){
        res.send(resModel.OK(location))
      } else {
        res.send(resModel.BAD_REQUEST())
      }
    } catch(err){
      throw new InternalServerErrorException(resModel.INTERNAL_ERROR().statusCode, resModel.INTERNAL_ERROR().message)
    }
  }
}
