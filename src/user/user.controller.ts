import { Controller, Get, Post, NotFoundException, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { users } from '@prisma/client';
import { resModel } from 'src/model/resModel';
import { UserLogin } from 'src/types/user';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private config: ConfigService,
    private jwtService: JwtService
  ) {}
  @Post('sign-up')
  async signUp(@Body() data: users, @Res() res){
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

  @Post('login')
  async login(@Body() data: UserLogin, @Res() res) {
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
}
