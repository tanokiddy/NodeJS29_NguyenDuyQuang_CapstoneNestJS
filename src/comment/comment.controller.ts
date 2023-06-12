import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CommentDetailClass } from 'src/types/comment/commentOOP';
import { CommentDetail } from 'src/types/comment';
import { Request, Response } from 'express';
import { responseMessage } from 'src/utils';
import { AuthGuard } from '@nestjs/passport';
import { resModel } from 'src/model/resModel';

@ApiTags('Comment')
@UseGuards(AuthGuard('jwt'))
@Controller('comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private jwtService: JwtService,
  ) {}

  //Add comment
  @ApiBody({ type: CommentDetailClass })
  @Post('add-comment')
  async addComment(
    @Res() res: Response,
    @Req() req: Request,
    @Body() data: CommentDetail,
  ) {
    const user = this.jwtService.decode(req.cookies.UUID);
    const { id: user_id } = user['data'];
    const date_comment = new Date();
    const newData = {
      ...data,
      user_id,
      date_comment,
      job_code: Number(data.job_code),
      rate_comment: Number(data.rate_comment),
      room_id: Number(data.room_id),
    };
    const fn = () => this.commentService.addComment(newData);
    await responseMessage(res, fn);
  }

  //Get all comments
  @Get('get-comments')
  async getAllComment(@Res() res: Response) {
    const fn = () => this.commentService.getAllComment();
    await responseMessage(res, fn);
  }

  //get comment by user id
  @ApiParam({ name: 'userId' })
  @Get('get-comment-by-user/:id')
  async getCommentByUserId(
    @Res() res: Response,
    @Req() req: Request,
    @Param() param: { id: string },
  ) {
    const { id } = param;
    const fn = () => this.commentService.getAllCommentByUserId(Number(id));
    await responseMessage(res, fn, '', resModel.NOT_FOUND());
  }

  //get comment by room id
  @ApiParam({ name: 'roomId' })
  @Get('get-comment-by-room/:roomId')
  async getCommentByRoomId(
    @Res() res: Response,
    @Req() req: Request,
    @Param() param: { roomId: string },
  ) {
    const { roomId } = param;
    const fn = () => this.commentService.getAllCommentByRoomId(Number(roomId));
    await responseMessage(res, fn, '', resModel.NOT_FOUND());
  }

  //update comment by id
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CommentDetailClass })
  @Put('update-comment/:id')
  async editCommentById(
    @Res() res: Response,
    @Req() req: Request,
    @Param() param: { id: string },
    @Body() data: CommentDetail,
  ) {
    const user = this.jwtService.decode(req.cookies.UUID);
    const { id: user_id } = user['data'];
    const newData = {
      ...data,
      user_id,
    };
    const { id } = param;
    const fn = () => this.commentService.editCommentById(Number(id), newData);
    await responseMessage(res, fn, '', resModel.NOT_FOUND());
  }

  //delete comment by id
  @ApiParam({ name: 'id' })
  @Delete('delete-comment/:id')
  async deleteCommentById(
    @Res() res: Response,
    @Param() param: { id: string },
  ) {
    const { id } = param;
    const fn = () => this.commentService.deleteCommentById(Number(id));
    await responseMessage(res, fn, '', resModel.NOT_FOUND());
  }
}
