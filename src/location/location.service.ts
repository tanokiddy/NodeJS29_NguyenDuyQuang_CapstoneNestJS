import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { locationModel } from 'src/model/locationModel';
import { LocationDetail } from 'src/types/location';

@Injectable()
export class LocationService {
    prisma = new PrismaClient()
    async uploadLocation(data: LocationDetail):Promise<LocationDetail | null> {
        return await locationModel.uploadLocation(data)
    }
}
