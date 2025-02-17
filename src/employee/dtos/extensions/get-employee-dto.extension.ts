import { CEmployee } from 'src/application/db/employee-management-db/entities/c-employee.entity';
import { EmployeeRoleDto, GetEmployeeDto } from '../employee.dto';

// Data type conversions
// Metodos envueltos en un objeto como una entidad separada a "GetEmployeeDto"
GetEmployeeDto.fromCEmployee = (cEmployee: CEmployee): GetEmployeeDto => {
  // Logica para la conversion
  const res = new GetEmployeeDto({
    id: cEmployee.id,
    createdAt: cEmployee.created_at,
    updatedAt: cEmployee.updated_at,
    key: cEmployee.key,
    name: cEmployee.name,
    lastName: cEmployee.last_name,
    maternalLastName: cEmployee.maternal_last_name,
    rfc: cEmployee.rfc,
    curp: cEmployee.curp,
    bankAccountNumber: cEmployee.bank_account_number,
    entryDate: cEmployee.entry_date,
    departureDate: cEmployee.departure_date,
    contractType: cEmployee.contract_type,
    salaryType: cEmployee.salary_type,
    workingDay: cEmployee.working_day,
    department: {
      id: cEmployee.department.id,
      key: cEmployee.department.key,
      name: cEmployee.department.name,
    },
    roles: cEmployee.roles.map((rol) => ({
      id: rol.id,
      key: rol.key,
      name: rol.name,
    })),
  });

  return res;
};

export const GetEmployeeDtoExtensions = {
  fromCEmployee(cEmployee: CEmployee): GetEmployeeDto {
    // Logica para la conversion
    const res = new GetEmployeeDto({
      id: cEmployee.id,
      createdAt: cEmployee.created_at,
      updatedAt: cEmployee.updated_at,
      key: cEmployee.key,
      name: cEmployee.name,
      lastName: cEmployee.last_name,
      maternalLastName: cEmployee.maternal_last_name,
      rfc: cEmployee.rfc,
      curp: cEmployee.curp,
      bankAccountNumber: cEmployee.bank_account_number,
      entryDate: cEmployee.entry_date,
      departureDate: cEmployee.departure_date,
      contractType: cEmployee.contract_type,
      salaryType: cEmployee.salary_type,
      workingDay: cEmployee.working_day,
      department: {
        id: cEmployee.department.id,
        key: cEmployee.department.key,
        name: cEmployee.department.name,
      },
      roles: cEmployee.roles.map(
        (rol) =>
          new EmployeeRoleDto({
            id: rol.id,
            key: rol.key,
            name: rol.name,
          }),
      ),
    });

    return res;
  },
};
