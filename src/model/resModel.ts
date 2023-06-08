import { HttpStatus } from '@nestjs/common';

export const resModel = {
  OK: (data?: any) => {
    return {
      messageCode: HttpStatus.OK,
      message: 'success',
      data,
    };
  },
  BAD_REQUEST: () => {
    return {
      messageCode: HttpStatus.BAD_REQUEST,
      message: 'Email has been taken, please enter another email',
    };
  },
};
