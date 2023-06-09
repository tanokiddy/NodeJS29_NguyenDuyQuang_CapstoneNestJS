import { HttpStatus } from '@nestjs/common';
import { ResModel, ResModelWithData } from 'src/types/res';

export const resModel = {
  OK: (data?: any):ResModelWithData<any> => {
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data,
    };
  },
  BAD_REQUEST: ():ResModel => {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Email has been taken, please enter another email',
    };
  },
  INTERNAL_ERROR: ():ResModel => { 
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal server error"
    }  
  }
};
