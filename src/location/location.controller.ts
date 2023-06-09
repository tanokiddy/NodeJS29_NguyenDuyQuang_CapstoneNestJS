import { resModel } from './../model/resModel';
import { Body, Controller, InternalServerErrorException, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDetail } from 'src/types/location';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @UseInterceptors(FileInterceptor('imageUpload', {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, callback) => callback(null, Date.now() + "_" + file.originalname)
    })
  }))
  @Post('upload-location')
  async uploadLocation(@Body() data: LocationDetail, @Res() res, @UploadedFile() file){
    const newData = {
      ...data,
      image: file.filename
    }
    try {
      const location = await this.locationService.uploadLocation(newData)
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
