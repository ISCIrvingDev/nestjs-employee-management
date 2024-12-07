import { Module } from '@nestjs/common';
import { EmployeeRoleController } from './employee-role.controller';
import { EmployeeRoleService } from './employee-role.service';

@Module({
  controllers: [EmployeeRoleController],
  providers: [EmployeeRoleService],
})
export class EmployeeRoleModule {}
