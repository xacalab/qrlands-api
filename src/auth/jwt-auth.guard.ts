import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends PassportAuthGuard('jwt') {
  /**
   * Global AuthGuard. Allows any requests unless the JWT is invalid.
   * @param err Possible error.
   * @param user The user parsed from JWT.
   * @param info Can contain errors JsonWebTokenError (thrown) or Error if token not provided.
   * @param context Unused.
   * @param status Unused.
   * @returns The user received.
   */
  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    if (info instanceof Error && info.name === 'JsonWebTokenError') {
      throw new HttpException(
        { message: info.message },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (err) {
      throw err;
    }

    return user;
  }
}
