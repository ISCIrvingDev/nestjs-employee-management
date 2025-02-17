import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CEmployee } from 'src/application/db/employee-management-db/entities/c-employee.entity';
import { Repository } from 'typeorm';
import { GetEmployeeDto, NewEmployeeDto } from './dtos/employee.dto';
import { NewEmployeeDtoExtensions } from './dtos/extensions/new-employee-dto.extension'; // Metodos envueltos en un objeto como una entidad separada a "NewEmployeeDto"
import { GetEmployeeDtoExtensions } from './dtos/extensions/get-employee-dto.extension';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(CEmployee)
    private readonly _employeeRepository: Repository<CEmployee>,
  ) {}

  async getAllEmployees(): Promise<GetEmployeeDto[]> {
    const allEmployees = await this._employeeRepository.find({
      where: {
        active: true,
      },
      order: {
        id: 'DESC',
      },
    });

    // Mapping the response
    const res = allEmployees.map(
      (employee) =>
        ({
          id: employee.id,
          createdAt: employee.created_at,
          updatedAt: employee.updated_at,
          key: employee.key,
          name: employee.name,
          lastName: employee.last_name,
          maternalLastName: employee.maternal_last_name,
          rfc: employee.rfc,
          curp: employee.curp,
          bankAccountNumber: employee.bank_account_number,
          entryDate: employee.entry_date,
          departureDate: employee.departure_date,
          contractType: employee.contract_type,
          salaryType: employee.salary_type,
          workingDay: employee.working_day,
          department: {
            id: employee.department.id,
            key: employee.department.key,
            name: employee.department.name,
          },
          roles: employee.roles.map((rol) => ({
            id: rol.id,
            key: rol.key,
            name: rol.name,
          })),
        }) as GetEmployeeDto,
    );

    return res;
  }

  async getEmployeeById(id: number): Promise<GetEmployeeDto> {
    const employee = await this._employeeRepository.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    // Data validation
    if (!employee) {
      throw new BadRequestException(
        `There is no active data with the ID: ${id}`,
      );
    }

    // Mapping the response
    const res = {
      id: employee.id,
      createdAt: employee.created_at,
      updatedAt: employee.updated_at,
      key: employee.key,
      name: employee.name,
      lastName: employee.last_name,
      maternalLastName: employee.maternal_last_name,
      rfc: employee.rfc,
      curp: employee.curp,
      bankAccountNumber: employee.bank_account_number,
      entryDate: employee.entry_date,
      departureDate: employee.departure_date,
      contractType: employee.contract_type,
      salaryType: employee.salary_type,
      workingDay: employee.working_day,
      department: {
        id: employee.department.id,
        key: employee.department.key,
        name: employee.department.name,
      },
      roles: employee.roles.map((rol) => ({
        id: rol.id,
        key: rol.key,
        name: rol.name,
      })),
    } as GetEmployeeDto;

    return res;
  }

  async createEmployee(
    newEmployeeDto: NewEmployeeDto,
  ): Promise<GetEmployeeDto> {
    // Mapping entry data
    const newCEmployee = NewEmployeeDtoExtensions.toCEmployee(newEmployeeDto); // 1) Aqui me quede, hay que probar el extension methos

    // Persisting data in DB
    const newEmployeeToBeStored = this._employeeRepository.create(newCEmployee);
    const newEmployee = await this._employeeRepository.save(
      newEmployeeToBeStored,
    );

    // Mapping the response
    const res = GetEmployeeDtoExtensions.fromCEmployee(newEmployee); // 2) Aqui me quede, cambiar el tipo de metodo de una extension a un metodo dentro de un objeto en una entidad aparte

    return res;
  }

  async updateEmployeeById(
    id: number,
    newEmployeeDto: NewEmployeeDto,
  ): Promise<GetEmployeeDto> {
    const oldEmployee = await this._employeeRepository.update(
      id,
      newEmployeeDto,
    );

    // Data validation
    if (!(oldEmployee.affected && oldEmployee.affected > 0)) {
      throw new BadRequestException(
        `There was no data to be updated with the ID: ${id}`,
      );
    }

    const newEmployee = await this._employeeRepository.findOne({
      where: {
        id: id,
        active: true,
      },
    });

    // Mapping the response
    const res = {
      id: newEmployee.id,
      createdAt: newEmployee.created_at,
      updatedAt: newEmployee.updated_at,
      key: newEmployee.key,
      name: newEmployee.name,
      lastName: newEmployee.last_name,
      maternalLastName: newEmployee.maternal_last_name,
      rfc: newEmployee.rfc,
      curp: newEmployee.curp,
      bankAccountNumber: newEmployee.bank_account_number,
      entryDate: newEmployee.entry_date,
      departureDate: newEmployee.departure_date,
      contractType: newEmployee.contract_type,
      salaryType: newEmployee.salary_type,
      workingDay: newEmployee.working_day,
      department: {
        id: newEmployee.department.id,
        key: newEmployee.department.key,
        name: newEmployee.department.name,
      },
      roles: newEmployee.roles.map((rol) => ({
        id: rol.id,
        key: rol.key,
        name: rol.name,
      })),
    } as GetEmployeeDto;

    return res;
  }

  async deleteEmployeeById(id: number): Promise<GetEmployeeDto> {
    const newValues = {
      active: false,
    };

    const oldDeletedEmployee = await this._employeeRepository.update(
      id,
      newValues,
    );

    // Data validation
    if (!(oldDeletedEmployee.affected && oldDeletedEmployee.affected > 0)) {
      throw new BadRequestException(
        `There was no data to be deleted with the ID: ${id}`,
      );
    }

    const newDeletedEmployee = await this._employeeRepository.findOne({
      where: {
        id: id,
      },
    });

    // Mapping the response
    const res = {
      id: newDeletedEmployee.id,
      createdAt: newDeletedEmployee.created_at,
      updatedAt: newDeletedEmployee.updated_at,
      key: newDeletedEmployee.key,
      name: newDeletedEmployee.name,
      lastName: newDeletedEmployee.last_name,
      maternalLastName: newDeletedEmployee.maternal_last_name,
      rfc: newDeletedEmployee.rfc,
      curp: newDeletedEmployee.curp,
      bankAccountNumber: newDeletedEmployee.bank_account_number,
      entryDate: newDeletedEmployee.entry_date,
      departureDate: newDeletedEmployee.departure_date,
      contractType: newDeletedEmployee.contract_type,
      salaryType: newDeletedEmployee.salary_type,
      workingDay: newDeletedEmployee.working_day,
      department: {
        id: newDeletedEmployee.department.id,
        key: newDeletedEmployee.department.key,
        name: newDeletedEmployee.department.name,
      },
      roles: newDeletedEmployee.roles.map((rol) => ({
        id: rol.id,
        key: rol.key,
        name: rol.name,
      })),
    } as GetEmployeeDto;

    return res;
  }
}
