import { CEmployee } from 'src/application/db/employee-management-db/entities/c-employee.entity';
import { EmployeeRoleDto, NewEmployeeDto } from '../employee.dto';
import { CDepartment } from 'src/application/db/employee-management-db/entities/c-department.entity';
import { CEmployeeRole } from 'src/application/db/employee-management-db/entities/c-employee-role.entity';

// Data type conversions
// Version -> Arrow Function
// NewEmployeeDto.prototype.toCEmployee = (
//   newEmployeeDto: NewEmployeeDto,
// ): CEmployee => {
//   // Logica para la conversion
//   const res = new CEmployee({
//     key: newEmployeeDto.key,
//     name: newEmployeeDto.name,
//     last_name: newEmployeeDto.lastName,
//     maternal_last_name: newEmployeeDto.maternalLastName,
//     rfc: newEmployeeDto.rfc,
//     curp: newEmployeeDto.curp,
//     bank_account_number: newEmployeeDto.bankAccountNumber,
//     entry_date: newEmployeeDto.entryDate,
//     departure_date: newEmployeeDto.departureDate,
//     contract_type: newEmployeeDto.contractType,
//     salary_type: newEmployeeDto.salaryType,
//     working_day: newEmployeeDto.workingDay,
//     department: new CDepartment({
//       id: newEmployeeDto.department.id,
//       key: newEmployeeDto.department.key,
//       name: newEmployeeDto.department.name,
//     }),
//     roles: newEmployeeDto.roles.map(
//       (rol) =>
//         new CEmployeeRole({
//           id: rol.id,
//           key: rol.key,
//           name: rol.name,
//         }),
//     ),
//   });

//   return res;
// };

// Version -> Anonymous Function
// NewEmployeeDto.prototype.toCEmployee = function (
//   this: NewEmployeeDto,
// ): CEmployee {
//   // Logica para la conversion
//   const res = new CEmployee({
//     key: this.key,
//     name: this.name,
//     last_name: this.lastName,
//     maternal_last_name: this.maternalLastName,
//     rfc: this.rfc,
//     curp: this.curp,
//     bank_account_number: this.bankAccountNumber,
//     entry_date: this.entryDate,
//     departure_date: this.departureDate,
//     contract_type: this.contractType,
//     salary_type: this.salaryType,
//     working_day: this.workingDay,
//     department: new CDepartment({
//       id: this.department.id,
//       key: this.department.key,
//       name: this.department.name,
//     }),
//     roles: this.roles.map(
//       (rol) =>
//         new CEmployeeRole({
//           id: rol.id,
//           key: rol.key,
//           name: rol.name,
//         }),
//     ),
//   });

//   return res;
// };

// NewEmployeeDto.prototype.fromCEmployee = (
//   cEmployee: CEmployee,
// ): NewEmployeeDto => {
//   // Logica para la conversion
//   const res = new NewEmployeeDto({
//     key: cEmployee.key,
//     name: cEmployee.name,
//     lastName: cEmployee.last_name,
//     maternalLastName: cEmployee.maternal_last_name,
//     rfc: cEmployee.rfc,
//     curp: cEmployee.curp,
//     bankAccountNumber: cEmployee.bank_account_number,
//     entryDate: cEmployee.entry_date,
//     departureDate: cEmployee.departure_date,
//     contractType: cEmployee.contract_type,
//     salaryType: cEmployee.salary_type,
//     workingDay: cEmployee.working_day,
//     department: {
//       id: cEmployee.department.id,
//       key: cEmployee.department.key,
//       name: cEmployee.department.name,
//     },
//     roles: cEmployee.roles.map(
//       (rol) =>
//         new EmployeeRoleDto({
//           id: rol.id,
//           key: rol.key,
//           name: rol.name,
//         }),
//     ),
//   });

//   return res;
// };

// Como no se pudieron exportar las clases con los prototipos, se procedio a exportar los metodos y a asignarlos como valor dentro del DTO
// export const NewEmployeeDtoExtensions = {
//   toCEmployee(this: NewEmployeeDto): CEmployee {
//     // Logica para la conversion
//     const res = new CEmployee({
//       key: this.key,
//       name: this.name,
//       last_name: this.lastName,
//       maternal_last_name: this.maternalLastName,
//       rfc: this.rfc,
//       curp: this.curp,
//       bank_account_number: this.bankAccountNumber,
//       entry_date: this.entryDate,
//       departure_date: this.departureDate,
//       contract_type: this.contractType,
//       salary_type: this.salaryType,
//       working_day: this.workingDay,
//       department: new CDepartment({
//         id: this.department.id,
//         key: this.department.key,
//         name: this.department.name,
//       }),
//       roles: this.roles.map(
//         (rol) =>
//           new CEmployeeRole({
//             id: rol.id,
//             key: rol.key,
//             name: rol.name,
//           }),
//       ),
//     });

//     return res;
//   },
//   fromCEmployee(cEmployee: CEmployee): NewEmployeeDto {
//     // Logica para la conversion
//     const res = new NewEmployeeDto({
//       key: cEmployee.key,
//       name: cEmployee.name,
//       lastName: cEmployee.last_name,
//       maternalLastName: cEmployee.maternal_last_name,
//       rfc: cEmployee.rfc,
//       curp: cEmployee.curp,
//       bankAccountNumber: cEmployee.bank_account_number,
//       entryDate: cEmployee.entry_date,
//       departureDate: cEmployee.departure_date,
//       contractType: cEmployee.contract_type,
//       salaryType: cEmployee.salary_type,
//       workingDay: cEmployee.working_day,
//       department: {
//         id: cEmployee.department.id,
//         key: cEmployee.department.key,
//         name: cEmployee.department.name,
//       },
//       roles: cEmployee.roles.map(
//         (rol) =>
//           new EmployeeRoleDto({
//             id: rol.id,
//             key: rol.key,
//             name: rol.name,
//           }),
//       ),
//     });

//     return res;
//   },
// };

// Debido a que no reconoce las funciones como propias de la clase ya que TypeScript no lo agrega de manera automatica al estar definido, lo mejor sera crear metodos y exportarlos para la conversion
// export const toCEmployee = function (this: NewEmployeeDto): CEmployee {
//   // Logica para la conversion
//   const res = new CEmployee({
//     key: this.key,
//     name: this.name,
//     last_name: this.lastName,
//     maternal_last_name: this.maternalLastName,
//     rfc: this.rfc,
//     curp: this.curp,
//     bank_account_number: this.bankAccountNumber,
//     entry_date: this.entryDate,
//     departure_date: this.departureDate,
//     contract_type: this.contractType,
//     salary_type: this.salaryType,
//     working_day: this.workingDay,
//     department: new CDepartment({
//       id: this.department.id,
//       key: this.department.key,
//       name: this.department.name,
//     }),
//     roles: this.roles.map(
//       (rol) =>
//         new CEmployeeRole({
//           id: rol.id,
//           key: rol.key,
//           name: rol.name,
//         }),
//     ),
//   });

//   return res;
// };

// export const fromCEmployee = function (cEmployee: CEmployee): NewEmployeeDto {
//   // Logica para la conversion
//   const res = new NewEmployeeDto({
//     key: cEmployee.key,
//     name: cEmployee.name,
//     lastName: cEmployee.last_name,
//     maternalLastName: cEmployee.maternal_last_name,
//     rfc: cEmployee.rfc,
//     curp: cEmployee.curp,
//     bankAccountNumber: cEmployee.bank_account_number,
//     entryDate: cEmployee.entry_date,
//     departureDate: cEmployee.departure_date,
//     contractType: cEmployee.contract_type,
//     salaryType: cEmployee.salary_type,
//     workingDay: cEmployee.working_day,
//     department: {
//       id: cEmployee.department.id,
//       key: cEmployee.department.key,
//       name: cEmployee.department.name,
//     },
//     roles: cEmployee.roles.map(
//       (rol) =>
//         new EmployeeRoleDto({
//           id: rol.id,
//           key: rol.key,
//           name: rol.name,
//         }),
//     ),
//   });

//   return res;
// };

// Metodos envueltos en un objeto como una entidad separada a "NewEmployeeDto"
export const NewEmployeeDtoExtensions = {
  toCEmployee(newEmployeeDto: NewEmployeeDto): CEmployee {
    // Logica para la conversion
    const res = new CEmployee({
      key: newEmployeeDto.key,
      name: newEmployeeDto.name,
      last_name: newEmployeeDto.lastName,
      maternal_last_name: newEmployeeDto.maternalLastName,
      rfc: newEmployeeDto.rfc,
      curp: newEmployeeDto.curp,
      bank_account_number: newEmployeeDto.bankAccountNumber,
      entry_date: newEmployeeDto.entryDate,
      departure_date: newEmployeeDto.departureDate,
      contract_type: newEmployeeDto.contractType,
      salary_type: newEmployeeDto.salaryType,
      working_day: newEmployeeDto.workingDay,
      department: new CDepartment({
        id: newEmployeeDto.department.id,
        key: newEmployeeDto.department.key,
        name: newEmployeeDto.department.name,
      }),
      roles: newEmployeeDto.roles.map(
        (rol) =>
          new CEmployeeRole({
            id: rol.id,
            key: rol.key,
            name: rol.name,
          }),
      ),
    });

    return res;
  },
  fromCEmployee(cEmployee: CEmployee): NewEmployeeDto {
    // Logica para la conversion
    const res = new NewEmployeeDto({
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
