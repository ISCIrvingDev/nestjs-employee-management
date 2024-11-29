import {
  Controller,
  Get /*, HttpException, Res*/,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
// import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth-check')
  getHelloAuthCheck(/*@Res() res: Response*/): string {
    return this.appService.getHelloAuthCheck();
    // try {
    //   return this.appService.getHelloAuthCheck();
    // } catch (error) {
    //   res
    //     .status(error instanceof HttpException ? error.getStatus() : 500)
    //     .json({
    //       name: error.name,
    //       message: error.message,
    //       stack: error.stack,
    //     } as Error);
    // }
  }
}
