import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserLoginDto, UserRefreshJwtDto } from './dtos/user.dto';
import { UserEntity } from './entity/user.entity';
import { JwtTokensModel, UserJwtModel } from './models/user.model';

@Injectable()
export class AuthService {
  // Mock Data - Ejemplo de usuarios para pruebas
  // private users: {
  //   id: number;
  //   username: string;
  //   password: string;
  // }[] = [];
  private users: UserEntity[] = [];

  constructor(private jwtService: JwtService) {
    // const pass = 'zdfjsklwnelkdmlwek35465'; // El hash en string

    // El hash en string
    // const pass = (async () => {
    //   const res = await bcrypt.hash('password123', 10);

    //   return res;
    // })();

    this.users = [
      {
        id: 1,
        username: 'user1',
        // password: pass,
        password: '',
      },
    ];

    // bcrypt.hash('password123', 10).then(function (hash) {
    //   // Store hash in your password DB.
    //   this.users = [ // TypeError: Cannot set properties of undefined (setting 'users')
    //     {
    //       id: 1,
    //       username: 'user1',
    //       password: hash,
    //     },
    //   ];
    // });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserJwtModel> {
    // Busca el usuario en la BD
    const user = this.users.find(
      (user) => user.username === userLoginDto.username,
    );

    user.password = await bcrypt.hash('password123', 10);

    // Desencripta el pass
    const pass: boolean = await bcrypt.compare(
      userLoginDto.password,
      user.password,
    ); // Devuelte un boolean, true si el pass es correcto, false si no es correcto

    if (user && pass) {
      // eslint error: "'password' is assigned a value but never used"
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user; // Como no queremos devolver el pass, regresamos el resto del objeto -> result = {id: 1, username: 'user1'}

      return result;
    }

    throw new UnauthorizedException('Credenciales inválidas');
  }

  async login(user: UserJwtModel): Promise<JwtTokensModel> {
    console.log(
      'El "expiresIn" de AuthService/login: ',
      process.env.JWT_EXPIRATION_TIME,
    );

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRATION_TIME || '30m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(
    userRefreshJwtDto: UserRefreshJwtDto,
  ): Promise<JwtTokensModel> {
    try {
      console.log(
        'El "expiresIn" de AuthService/refreshToken: ',
        process.env.JWT_EXPIRATION_TIME,
      );

      const payload = this.jwtService.verify(userRefreshJwtDto.refreshToken);
      const newAccessToken = this.jwtService.sign(
        { username: payload.username, sub: payload.sub },
        { expiresIn: process.env.JWT_EXPIRATION_TIME || '30m' },
      );

      return { accessToken: newAccessToken };
    } catch (e) {
      throw new UnauthorizedException('Token de refresco inválido: ', e);
    }
  }
}
