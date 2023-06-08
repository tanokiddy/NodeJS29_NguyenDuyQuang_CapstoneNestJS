import { Controller, Get, Post, NotFoundException, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { users } from '@prisma/client';
import { resModel } from 'src/model/resModel';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    // private config: ConfigService,
  ) {}
  @Post()
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
}
