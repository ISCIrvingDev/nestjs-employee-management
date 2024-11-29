import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const res = super.canActivate(context); // Llama a la implementación de AuthGuard para validar el token

    return res;
  }

  // Personaliza la respuesta si hay un error o si el usuario no es válido
  handleRequest(err: any, user: any /*, info: any*/) {
    if (err || !user) {
      throw err || new UnauthorizedException('Usuario no autorizado');
    }

    return user;
  }
  // Log a los argumentos para ver si hay un error
  // handleRequest(
  //   ...args: Parameters<
  //     InstanceType<ReturnType<typeof AuthGuard>>['handleRequest']
  //   >
  // ) {
  //   console.log('los args son: ', args);
  //   return super.handleRequest(...args);
  // }
}
