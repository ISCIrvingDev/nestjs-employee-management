import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  AppErrorResponseModel,
  AppResponseModel,
} from '../models/app-response.model';

@Catch(HttpException)
export class ResponseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const res: AppResponseModel<AppErrorResponseModel> = {
      success: false,
      data: {
        statusCode: status,
        timestamp: new Date().toString(), //.toISOString(),
        path: request.url,
        message: exception.message,
        name: exception.name,
        stack: exception.stack,
      },
    };

    response.status(status).json(res);
  }
}
