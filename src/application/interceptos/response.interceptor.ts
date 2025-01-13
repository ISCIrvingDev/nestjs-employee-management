import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppResponseModel } from '../models/app-response.model';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<AppResponseModel<any>> {
    return next
      .handle()
      .pipe(map((data) => ({ success: true, data }) as AppResponseModel<any>));
  }
}
