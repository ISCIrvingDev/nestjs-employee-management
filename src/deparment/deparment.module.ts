import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CDepartment } from 'src/application/db/employee-management-db/entities/c-department.entity';
import { DepartmentController } from './deparment.controller';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
  imports: [TypeOrmModule.forFeature([CDepartment])],
})
export class DepartmentModule {}
