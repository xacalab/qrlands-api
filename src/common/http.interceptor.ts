import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  ExecutionContext,
  NestInterceptor,
  HttpException,
  CallHandler,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { Logger } from '@api/common';

interface JwtPayload {
  sub: string;
}

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  private logger: Logger;

  constructor() {
    const logLabel = 'HttpInterceptor';
    this.logger = new Logger(logLabel);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, path } = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const user: JwtPayload | undefined = context
      .switchToHttp()
      .getRequest().user;

    const meta = {
      type: 'http',
      statusCode,
      method,
      path,
      user: user?.sub,
    };

    return next.handle().pipe(
      tap(() => {
        const userStr = user ? `{user:${user.sub.slice(0, 6)}}` : '';
        this.logger.http({
          message: `(${statusCode}) [${method} ${path}] ${userStr}`,
          meta,
        });
      }),
      catchError((err) => {
        if (err instanceof HttpException) {
          this.logger.http({
            message: `${method} ${path} (${err.getStatus()})`,
            meta,
          });
          throw err;
        }

        this.logger.warn(`Unhandled error - ${err}`);
        throw new HttpException(
          { message: 'Unknown error' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
