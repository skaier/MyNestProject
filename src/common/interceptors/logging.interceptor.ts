import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, query, params } = request;
    const now = Date.now();

    this.logger.log(
      `Request: ${method} ${url} | Body: ${JSON.stringify(body)} | Query: ${JSON.stringify(query)} | Params: ${JSON.stringify(params)}`
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `Response: ${method} ${url} - ${Date.now() - now}ms`
        );
      }),
    );
  }
}