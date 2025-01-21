import { Module } from '@nestjs/common';
import { EmployeeRoleController } from './employee-role.controller';
import { EmployeeRoleService } from './employee-role.service';
import { CEmployeeRole } from 'src/application/db/employee-management-db/entities/c-employee-role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EmployeeRoleController],
  providers: [EmployeeRoleService],
  imports: [TypeOrmModule.forFeature([CEmployeeRole])],
})
export class EmployeeRoleModule {}
