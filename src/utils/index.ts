import { InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { resModel } from 'src/model/resModel';
import { ResModel } from 'src/types/res';

export const responseMessage = async (
  res: Response,
  fnService: any,
  message?: string,
  statusCode: ResModel = resModel.BAD_REQUEST(message)
) => {
  try {
    const results = await fnService()
    if (results) {
      res.send(resModel.OK(results));
    } else {
      res.send(statusCode);
    }
  } catch (err) {
    throw new InternalServerErrorException(
      resModel.INTERNAL_ERROR().statusCode,
      resModel.INTERNAL_ERROR().message,
    );
  }
};
