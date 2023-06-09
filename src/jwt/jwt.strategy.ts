import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      ignoreExpiration: false,
      secretOrKey: config.get('TOKEN_KEY'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => { 
          const accessToken = request?.cookies['UUID']
          return accessToken
        }
      ]),
    });
  }
  async validate(payload: any) {
    return payload;
  }
}
