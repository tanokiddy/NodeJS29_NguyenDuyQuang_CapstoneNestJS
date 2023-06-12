import {
  Controller,
  Post,
  NotFoundException,
  Body,
  Res,
  UseGuards,
  Req,
  Get,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { users } from '@prisma/client';
import { resModel } from 'src/model/resModel';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserLogin, UserDetailClass } from '../types/user/userOOP';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { responseMessage } from 'src/utils';
import { SearchQueriesClass } from 'src/types/location/locationOOP';
import { SearchQueries } from 'src/types/location';
import { UserUpdate } from 'src/types/user';

@ApiTags('User & Authen')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}
  //Sign up
  @ApiBody({ type: UserDetailClass })
  @Post('sign-up')
  async signUp(@Body() data: users, @Res() res: Response) {
    try {
      const checkData = await this.userService.signUp(data);
      if (checkData) {
        res.send(resModel.OK());
      } else {
        res.send(resModel.BAD_REQUEST());
      }
    } catch (err) {
      throw new NotFoundException(404, 'your email or password is incorrect');
    }
  }
  //Sign in
  @ApiBody({ type: UserLogin })
  @Post('sign-in')
  async login(@Body() data: UserLogin, @Res() res: Response) {
    try {
      const checkData = await this.userService.login(data);
      if (checkData) {
        const token = this.jwtService.sign(
          { data: checkData },
          { secret: this.config.get('TOKEN_KEY'), expiresIn: '1d' },
        );
        res.cookie('UUID', token, {
          maxAge: 86400 * 1000,
        });
        res.send(resModel.OK(token));
      } else {
        res.send(resModel.BAD_REQUEST);
      }
    } catch {
      throw new NotFoundException(404, 'your email or password is incorrect');
    }
  }
  //Sign out
  @UseGuards(AuthGuard('jwt'))
  @Post('sign-out')
  signOut(@Res() res: Response) {
    res.clearCookie('UUID');
    res.send(resModel.OK());
  }
  //Get all user
  @Get('get-users')
  async getAllUser(@Res() res: Response) {
    const fn = () => this.userService.getAllUser();
    await responseMessage(res, fn);
  }

  //Get user by keyword
  @ApiQuery({ type: SearchQueriesClass })
  @Get('get-users-by-keyword')
  async getUserByKeyWord(
    @Res() res: Response,
    @Req() req: Request,
    @Query() data: SearchQueries,
  ) {
    const fn = () => this.userService.getUserByKeyword(data);
    await responseMessage(res, fn, '', resModel.NOT_FOUND());
  }

  //Get user by id
  @ApiParam({ name: 'userId' })
  @Get('get-user-by-id/:userId')
  async getUserById(@Res() res: Response, @Param() param: { userId: string }) {
    const { userId } = param;
    const fn = () => this.userService.getUserById(Number(userId));
    await responseMessage(res, fn, '', resModel.NOT_FOUND());
  }

  //Update user by id
  @ApiParam({ name: 'userId' })
  @ApiBody({ type: UserDetailClass })
  @Put('update-user/:userId')
  async updateUserById(
    @Res() res: Response,
    @Param() param: { userId: string },
    @Body() data: UserUpdate,
  ) {
    const { userId } = param;
    const newData = {
      ...data,
      id: Number(userId),
    };
    const fn = () => this.userService.updateUserById(Number(userId), newData);
    await responseMessage(res, fn,);
  }

  //Delete user by id
  @ApiParam({ name: 'userId' })
  @Delete('delete-user/:id')
  async deleteUserById(@Res() res: Response, @Param() param: { id: string }) {
    const { id } = param;
    const fn = () => this.userService.deleteUserById(Number(id));
    await responseMessage(res, fn, '', resModel.NOT_FOUND());
  }
}
