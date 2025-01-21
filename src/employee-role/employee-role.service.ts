import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CEmployeeRole } from 'src/application/db/employee-management-db/entities/c-employee-role.entity';
import { Repository } from 'typeorm';
import {
  GetDeletedEmployeeRoleDto,
  GetEmployeeRoleDto,
  NewEmployeeRoleDto,
} from './dtos/employee-role.dto';

@Injectable()
export class EmployeeRoleService {
  constructor(
    @InjectRepository(CEmployeeRole)
    private readonly _employeeRoleRepository: Repository<CEmployeeRole>,
  ) {}

  async getAllEmployeeRoles(): Promise<GetEmployeeRoleDto[]> {
    const allEmployeeRoles = await this._employeeRoleRepository.find({
      where: {
        active: true,
      },
    });

    // Mapping the response
    const res = allEmployeeRoles.map(
      (employeeRole) =>
        ({
          id: employeeRole.id,
          createdAt: employeeRole.created_at,
          updatedAt: employeeRole.updated_at,
          key: employeeRole.key,
          name: employeeRole.name,
          description: employeeRole.description,
        }) as GetEmployeeRoleDto,
    );

    return res;
  }

  async getEmployeeRoleById(id: number): Promise<GetEmployeeRoleDto> {
    const employeeRole = await this._employeeRoleRepository.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    // Data validation
    if (!employeeRole) {
      throw new BadRequestException(
        `There is no active data with the ID: ${id}`,
      );
    }

    // Mapping the response
    const res = {
      id: employeeRole.id,
      createdAt: employeeRole.created_at,
      updatedAt: employeeRole.updated_at,
      key: employeeRole.key,
      name: employeeRole.name,
      description: employeeRole.description,
    } as GetEmployeeRoleDto;

    return res;
  }

  async createEmployeeRole(
    newEmployeeRoleDto: NewEmployeeRoleDto,
  ): Promise<GetEmployeeRoleDto> {
    const newEmployeeRoleToBeStored =
      this._employeeRoleRepository.create(newEmployeeRoleDto);
    const newEmployeeRole = await this._employeeRoleRepository.save(
      newEmployeeRoleToBeStored,
    );

    // Mapping the response
    const res = {
      id: newEmployeeRole.id,
      createdAt: newEmployeeRole.created_at,
      updatedAt: newEmployeeRole.updated_at,
      key: newEmployeeRole.key,
      name: newEmployeeRole.name,
      description: newEmployeeRole.description,
    } as GetEmployeeRoleDto;

    return res;
  }

  async updateEmployeeRoleById(
    id: number,
    newEmployeeRoleDto: NewEmployeeRoleDto,
  ): Promise<GetEmployeeRoleDto> {
    const oldEmployeeRole = await this._employeeRoleRepository.update(
      id,
      newEmployeeRoleDto,
    );

    if (!(oldEmployeeRole.affected && oldEmployeeRole.affected > 0)) {
      throw new BadRequestException(
        `There was no data to be updated with the ID: ${id}`,
      );
    }

    const newEmployeeRole = await this._employeeRoleRepository.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    // Mapping the response
    const res = {
      id: newEmployeeRole.id,
      createdAt: newEmployeeRole.created_at,
      updatedAt: newEmployeeRole.updated_at,
      key: newEmployeeRole.key,
      name: newEmployeeRole.name,
      description: newEmployeeRole.description,
    } as GetEmployeeRoleDto;

    return res;
  }

  async deleteEmployeeRoleById(id: number): Promise<GetDeletedEmployeeRoleDto> {
    const newValues = {
      active: false,
    };

    const oldDeletedEmployeeRole = await this._employeeRoleRepository.update(
      id,
      newValues,
    );

    if (
      !(oldDeletedEmployeeRole.affected && oldDeletedEmployeeRole.affected > 0)
    ) {
      throw new BadRequestException(
        `There was no data to be deleted with the ID: ${id}`,
      );
    }

    const newDeletedEmployeeRole = await this._employeeRoleRepository.findOne({
      where: {
        id: id,
      },
    });

    // Mapping the response
    const res = {
      id: newDeletedEmployeeRole.id,
      active: newDeletedEmployeeRole.active,
      createdAt: newDeletedEmployeeRole.created_at,
      updatedAt: newDeletedEmployeeRole.updated_at,
      key: newDeletedEmployeeRole.key,
      name: newDeletedEmployeeRole.name,
      description: newDeletedEmployeeRole.description,
    } as GetDeletedEmployeeRoleDto;

    return res;
  }
}
