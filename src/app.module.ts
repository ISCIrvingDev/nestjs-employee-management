import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { employeeManagementDataSource } from './application/db/employee-management-db/datasource';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeRoleModule } from './employee-role/employee-role.module';
import { DepartmentModule } from './deparment/deparment.module';
import { LoggerMiddleware } from './application/middlewares/logs/Logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(employeeManagementDataSource),
    AuthModule,
    EmployeeModule,
    EmployeeRoleModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Middleware para todas las rutas
  }
}
