import { PrismaClient, locations } from '@prisma/client';
import { LocationDetail, SearchQueries } from 'src/types/location';
import * as fs from 'fs'
const prisma = new PrismaClient();

export const locationModel = {
  uploadLocation: async (
    data: LocationDetail, file: Express.Multer.File
    ): Promise<LocationDetail | null> => {
      const location = await prisma.locations.findFirst({
        where: {
          location_name: data.location_name,
        },
      });
    if (!location) {
      const location = await prisma.locations.create({ data: data });
      return location;
    } else {
      fs.unlinkSync(file.path)
      return null;
    }
  },

  getAllLocation: async (): Promise<LocationDetail[]> => {
    const allLocation = await prisma.locations.findMany();
    return allLocation;
  },

  updateLocationById: async (
    id: number,
    newData: LocationDetail,
    file: Express.Multer.File
  ): Promise<LocationDetail | null> => {
    const location = await prisma.locations.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (location) {
      const newLocation = await prisma.locations.update({
        data: newData,
        where: {
          id: Number(id),
        },
      });
      const oldPath = file.path.replace(newLocation.image, location.image)
      fs.unlinkSync(oldPath)
      return newLocation;
    } else {
      fs.unlinkSync(file.path);
      return null;
    }
  },

  findLocationByKeyword: async ({
    pageIndex = 1,
    pageSize = 5,
    keyword = '',
    orderBy = 'asc',
  }: SearchQueries): Promise<LocationDetail[] | null> => {
    const location = prisma.locations.findMany({
      skip: (pageIndex - 1) * pageSize,
      take: Number(pageSize),
      where: {
        location_name: {
          contains: keyword,
        },
      },
      orderBy: {
        location_name: orderBy,
      },
    });
    if (location) {
      return location;
    } else {
      return null;
    }
  },

  findLocationById: async (id: number): Promise<LocationDetail | null> => {
    const location = await prisma.locations.findFirst({
      where: {
        id: id,
      },
    });
    if (location) {
      return location;
    } else {
      return null;
    }
  },

  deleteLocationById: async (id: number): Promise<locations | null> => {
    const location = await prisma.locations.findFirst({
      where: {
        id,
      }
    })
    if(location) {
      const locationDelete = await prisma.locations.delete({
        where: {
          id,
        }
      })
      return locationDelete
    } else {
      return null
    }
  }
};
