import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  const env = process.env.NODE_ENV;
  console.log(`Ambiente: "${env}"`);

  app.setGlobalPrefix('api');

  if (env == 'development') {
    // Swagger
    const config = new DocumentBuilder()
      .setTitle('Employee Management')
      .setDescription('The Employee Management API description')
      .setVersion('1.0')
      .addTag('Employee Management')
      .addBearerAuth() // Es para hacerle saber a Swagger que va a hacer uso de Bearer Authentication en este API y agrega el boton de "Authorize" (para poder ingresar el token de autenticacion) en la UI de Swagger
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-documentation', app, document, {
      /*
       * Establece la URL para obtener el "Swagger JSON file"
       * Su valor por defecto es -> http://localhost:3000/${ruta-de-la-ui-de-swagger}-json -> http://localhost:3000/api-documentation-json
       */
      jsonDocumentUrl: 'swagger-json', // Nueva URL -> http://localhost:3000/swagger-json
    });

    console.log(
      `API Documentation -> at http://localhost:${port}/api-documentation`,
    );
    console.log(
      `API Documentation JSON -> at http://localhost:${port}/swagger-json`,
    );
  } /* else if (env == 'production') {
    // do something
  }*/

  app.useGlobalPipes(new ValidationPipe()); // Habilita la validacion global de los DTOs

  await app.listen(port);

  console.log(`App runnig at http://localhost:${port}/`);
}

bootstrap();
