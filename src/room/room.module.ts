import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [RoomController],
  providers: [RoomService, JwtStrategy]
})
export class RoomModule {}
