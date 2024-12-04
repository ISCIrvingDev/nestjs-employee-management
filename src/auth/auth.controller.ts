import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto, UserRefreshJwtDto } from './dtos/user.dto';
import { JwtTokensModel } from './models/user.model';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    description: 'A string saying "Hello World with Auth Guard!"',
    type: JwtTokensModel,
  })
  @ApiBadRequestResponse({ description: 'Invalid request!' })
  async login(@Body() userLoginDto: UserLoginDto): Promise<JwtTokensModel> {
    const user = await this.authService.validateUser(userLoginDto);

    return this.authService.login(user);
  }

  @Post('refresh-token')
  @ApiBadRequestResponse({ description: 'Invalid request!' })
  @ApiOkResponse({
    description: 'A string saying "Hello World with Auth Guard!"',
    type: JwtTokensModel,
    // isArray: true // Si fuera un array
  })
  async refreshToken(
    @Body() userRefreshJwtDto: UserRefreshJwtDto,
  ): Promise<JwtTokensModel> {
    return this.authService.refreshToken(userRefreshJwtDto);
  }

  // Para el logout se debe invalidar el token del lado del cliente, ya que JWT no puede ser invalidado del lado del servidor directamente
  // @Post('logout')
  // async logout() {
  //   return {
  //     message: 'Logout exitoso.',
  //   };
  // }
}
