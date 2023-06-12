import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [ReservationController],
  providers: [ReservationService, JwtStrategy]
})
export class ReservationModule {}
