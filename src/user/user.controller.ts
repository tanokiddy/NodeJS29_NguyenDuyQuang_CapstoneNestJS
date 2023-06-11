import { Controller, Post, NotFoundException, Body, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { users } from '@prisma/client';
import { resModel } from 'src/model/resModel';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserLogin, UserSignUp } from '../types/user/userOOP';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private config: ConfigService,
    private jwtService: JwtService
  ) {}
  //Sign up
  @ApiBody({type: UserSignUp})
  @Post('sign-up')
  async signUp(@Body() data: users, @Res() res:Response){
    try {
      const checkData = await this.userService.signUp(data)
      if(checkData) {
        res.send(resModel.OK())
      } else {
        res.send(resModel.BAD_REQUEST())
      }
    } catch (err) {
      throw new NotFoundException(404, 'your email or password is incorrect');
    }
  }
  //Sign in
  @ApiBody({type: UserLogin})
  @Post('sign-in')
  async login(@Body() data: UserLogin, @Res() res:Response) {
    try {
      const checkData = await this.userService.login(data)
      if(checkData){
        const token = this.jwtService.sign({data: checkData }, {secret: this.config.get("TOKEN_KEY"), expiresIn: "1d"})
        res.cookie('UUID', token, {
          maxAge: 86400 * 1000
        })
        res.send(resModel.OK(token))
      } else {
        res.send(resModel.BAD_REQUEST)
      }
    } catch {
      throw new NotFoundException(404, 'your email or password is incorrect')
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('sign-out')
  signOut(@Res() res:Response){
    res.clearCookie("UUID")
    res.send(resModel.OK())
  }
}
