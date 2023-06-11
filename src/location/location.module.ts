import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [LocationController],
  providers: [LocationService, JwtStrategy]
})
export class LocationModule {}
