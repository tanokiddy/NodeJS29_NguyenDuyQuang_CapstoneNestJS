import { Injectable } from '@nestjs/common';
import { PrismaClient, locations } from '@prisma/client';
import { locationModel } from 'src/model/locationModel';
import { LocationDetail, SearchQueries } from 'src/types/location';

@Injectable()
export class LocationService {
    prisma = new PrismaClient()
    //upload location
    async uploadLocation(data: LocationDetail,file: Express.Multer.File):Promise<LocationDetail | null> {
        return await locationModel.uploadLocation(data,file)
    }

    //get all location
    async getAllLocation():Promise<LocationDetail[]>{
        return await locationModel.getAllLocation()
    }

    //update location
    async updateLocation(id:number, data: LocationDetail,
        file: Express.Multer.File):Promise<LocationDetail>{
        return await locationModel.updateLocationById(id, data, file)
    }

    //find location 
    async findLocation(data: SearchQueries):Promise<LocationDetail[] | null>{
        return await locationModel.findLocationByKeyword(data)
    }

    //find location by id
    async findLocationById(id:number):Promise<LocationDetail | null> {
        return await locationModel.findLocationById(id)
    }

    //delete location by id
    async deleteLocationById(id:number):Promise<locations | null> {
        return await locationModel.deleteLocationById(id)
    }
}
