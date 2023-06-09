import { PrismaClient } from "@prisma/client";
import { LocationDetail } from "src/types/location";

const prisma = new PrismaClient()

export const locationModel = {
    uploadLocation: async (data: LocationDetail):Promise<LocationDetail | null> => { 
        const location = await prisma.locations.findFirst({
            where: {
                location_name: data.location_name
            }
        })
        if(!location){
            const location = await prisma.locations.create({data: data})
            return location
        } else {
            return null
        }
    }
}