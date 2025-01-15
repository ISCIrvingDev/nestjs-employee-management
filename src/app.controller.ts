import {
  Controller,
  Get /*, HttpException, Res*/,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  // ApiResponse,
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
    example: 'Hello World!',
  })
  // @ApiOkResponse({
  //   description: 'A string saying "Hello World!"',
  //   type: String,
  // })
  @ApiInternalServerErrorResponse({
    description: 'If something went wrong in the server',
    type: String,
  })
  @ApiBadRequestResponse({ description: 'If the request was invalid' })
  getHello(): string {
    // Prueba en caso de error
    // throw new HttpException(
    //   'Forbidden resource',
    //   HttpStatus.INTERNAL_SERVER_ERROR,
    // );
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
    example: 'Hello World with Auth Guard!',
  })
  getHelloAuthCheck(/*@Res() res: Response*/): string {
    return this.appService.getHelloAuthCheck();
  }
}
