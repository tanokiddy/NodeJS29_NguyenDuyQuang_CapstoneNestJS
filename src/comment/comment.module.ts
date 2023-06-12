import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [CommentController],
  providers: [CommentService, JwtStrategy]
})
export class CommentModule {}
