import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { employeeManagementDataSource } from './application/db/employee-management-db/datasource';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeRoleModule } from './employee-role/employee-role.module';
import { DeparmentModule } from './deparment/deparment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(employeeManagementDataSource),
    AuthModule,
    EmployeeModule,
    EmployeeRoleModule,
    DeparmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
