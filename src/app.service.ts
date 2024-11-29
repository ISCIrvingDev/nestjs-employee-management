import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getHelloAuthCheck(): string {
    return 'Hello World with Auth Guard!';
  }
}
