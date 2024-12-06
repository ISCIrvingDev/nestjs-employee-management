import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { employeeManagementDataSource } from './application/db/employee-management-db/datasource';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(employeeManagementDataSource),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
