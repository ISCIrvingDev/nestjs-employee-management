import {
  BadRequestException,
  // HttpException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CDepartment } from 'src/application/db/employee-management-db/entities/c-department.entity';
import { Repository } from 'typeorm';
import {
  GetDeletedDepartmentDto,
  GetDepartmentDto,
  NewDepartmentDto,
} from './dtos/department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(CDepartment)
    private readonly _departmentRepository: Repository<CDepartment>,
  ) {}

  async getAllDepartments(): Promise<GetDepartmentDto[]> {
    // Prueba de funcionalidad del "Filter" "ResponseFilter"
    // throw new HttpException('Forbidden resource', 555);

    const allDepartments = await this._departmentRepository.find({
      where: {
        active: true,
      },
    });

    // Mapping the response
    const res = allDepartments.map(
      (department) =>
        ({
          id: department.id,
          createdAt: department.created_at,
          updatedAt: department.updated_at,
          key: department.key,
          name: department.name,
          description: department.description,
        }) as GetDepartmentDto,
    );

    return res;
  }

  async getDepartmentById(id: number): Promise<GetDepartmentDto> {
    const department = await this._departmentRepository.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    // Data validation
    if (!department) {
      throw new BadRequestException(
        `There is no active data with the ID: ${id}`,
      );
    }

    // Mapping the response
    const res = {
      id: department.id,
      createdAt: department.created_at,
      updatedAt: department.updated_at,
      key: department.key,
      name: department.name,
      description: department.description,
    } as GetDepartmentDto;

    return res;
  }

  async createDepartment(
    newDepartmentDto: NewDepartmentDto,
  ): Promise<GetDepartmentDto> {
    const newDepartmentToBeStored =
      this._departmentRepository.create(newDepartmentDto);
    const newDepartment = await this._departmentRepository.save(
      newDepartmentToBeStored,
    );

    // Mapping the response
    const res = {
      id: newDepartment.id,
      createdAt: newDepartment.created_at,
      updatedAt: newDepartment.updated_at,
      key: newDepartment.key,
      name: newDepartment.name,
      description: newDepartment.description,
    } as GetDepartmentDto;

    return res;
  }

  async updateDepartmentById(
    id: number,
    newDepartmentDto: NewDepartmentDto,
  ): Promise<GetDepartmentDto> {
    const oldDepartment = await this._departmentRepository.update(
      id,
      newDepartmentDto,
    );

    // Data validation
    if (!(oldDepartment.affected && oldDepartment.affected > 0)) {
      throw new BadRequestException(
        `There was no data to be updated with the ID: ${id}`,
      );
    }

    const newDepartment = await this._departmentRepository.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    // Mapping the response
    const res = {
      id: newDepartment.id,
      createdAt: newDepartment.created_at,
      updatedAt: newDepartment.updated_at,
      key: newDepartment.key,
      name: newDepartment.name,
      description: newDepartment.description,
    } as GetDepartmentDto;

    return res;
  }

  async deleteDepartmentById(id: number): Promise<GetDeletedDepartmentDto> {
    /*
     * Debido a que no se va a borrar el registro de ls BD, no se hara uso del siguiente codigo (que es para borrar el registro de la BD)
     */
    // const department = await this._departmentRepository.delete(id);

    // Data validation
    // if (!(department.affected && department.affected > 0)) {
    //   throw new BadRequestException(`There was no data to be deleted with the ID: ${id}`);
    // }

    /*
     * En lugar de eliminar el registro de la BD, el registro se desactivara
     */
    // Objeto con los nuevos valores requeridos para desactivar el registro
    const newValues = {
      active: false,
    };

    const oldDepartment = await this._departmentRepository.update(
      id,
      newValues,
    );

    // Data validation
    if (!(oldDepartment.affected && oldDepartment.affected > 0)) {
      throw new BadRequestException(
        `There was no data to be deleted with the ID: ${id}`,
      );
    }

    const newDepartment = await this._departmentRepository.findOne({
      where: {
        id: id,
      },
    });

    // Mapping the response
    const res = {
      id: newDepartment.id,
      active: newDepartment.active,
      createdAt: newDepartment.created_at,
      updatedAt: newDepartment.updated_at,
      key: newDepartment.key,
      name: newDepartment.name,
      description: newDepartment.description,
    } as GetDeletedDepartmentDto;

    return res;
  }
}
