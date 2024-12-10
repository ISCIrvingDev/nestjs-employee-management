import {
  Controller,
  Get /*, HttpException, Res*/,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
// import { Response } from 'express';

@ApiTags('Root')
// @ApiBearerAuth() // Es para hacerle saber a Swagger que este Controller requiere de autenticacion. Se puede agregar a nivel de endpoint o a nivel de Controller
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Check the healt status',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A string saying "Hello World!"',
    type: String,
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('auth-check')
  @ApiBearerAuth() // Es para hacerle saber a Swagger que este endpoint requiere de autenticacion. Se puede agregar a nivel de endpoint o a nivel de Controller
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Check the healt status with authentication',
  })
  @ApiOkResponse({
    description: 'A string saying "Hello World with Auth Guard!"',
    type: String,
  })
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
