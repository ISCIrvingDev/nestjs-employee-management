import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

// Se tubo que importar "dotenv" y mandar a llamar el metodo "config()" ya que de no hacerlo, las varaibles de entorno del archivo ".env" aun no se habrian cargado al momento de mandarlas a llamar dentro del decorador "@Module" de la clase "AuthModule"
import * as dotenv from 'dotenv';
dotenv.config();

console.log('El "secret" de AuthModule: ', process.env.JWT_SECRET);
console.log('El "expiresIn" de AuthModule: ', process.env.JWT_EXPIRATION_TIME);

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'El secret key', // Usar una variable de entorno en producción
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || '30m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
