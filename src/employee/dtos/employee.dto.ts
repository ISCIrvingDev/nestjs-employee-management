import { ApiProperty } from '@nestjs/swagger';
// import { IsNumber, IsString, Length } from 'class-validator';
//   @IsString()
//   @Length(13, 13)

export class EmployeeDepartmentDto {
  @ApiProperty({
    description: 'The ID of the department (ID of the database)',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The key of the department',
    type: String,
    example: 'A0001',
  })
  key: string;

  @ApiProperty({
    description: 'The name of the department',
    type: String,
    example: 'Pharmacy',
  })
  name: string;
}

export class EmployeeRoleDto {
  @ApiProperty({
    description: 'The ID of the department (ID of the database)',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The key of the department',
    type: String,
    example: 'A0001',
  })
  key: string;

  @ApiProperty({
    description: 'The name of the department',
    type: String,
    example: 'Pharmacy',
  })
  name: string;
}

export class GetEmployeeDto {
  @ApiProperty({
    description: 'The ID of the employee (ID of the database)',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The date it was created',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The last date it was updated',
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The key of the employee',
    type: String,
    example: 'E0001',
  })
  key: string;

  @ApiProperty({
    description: 'The name of the employee',
    type: String,
    example: 'Irving',
  })
  name: string;

  @ApiProperty({
    description: 'The last name of the employee',
    type: String,
    example: 'Salazar',
  })
  lastName: string;

  @ApiProperty({
    description: 'The maternal last name of the employee',
    type: String,
    example: 'Rivas',
  })
  maternalLastName: string | null;

  @ApiProperty({
    description: 'The RFC of the employee',
    type: String,
    example: 'VECJ880326XXX',
  })
  rfc: string | null;

  @ApiProperty({
    description: 'The CURP of the employee',
    type: String,
    example: 'RACW050729MMCSHNA2',
  })
  curp: string | null;

  @ApiProperty({
    description: 'The bank account number of the employee',
    type: String,
  })
  bankAccountNumber: string | null;

  @ApiProperty({
    description: 'The entry date of the employee',
    type: Date,
  })
  entryDate: Date;

  @ApiProperty({
    description: 'The departure date of the employee',
    type: Date,
  })
  departureDate: Date | null;

  @ApiProperty({
    description: 'The contract type of the employee',
    type: String,
    example: 'POR PROYECTO',
  })
  contractType: string;

  @ApiProperty({
    description: 'The salary type of the employee',
    type: String,
    example: 'POR HORA',
  })
  salaryType: string;

  @ApiProperty({
    description: 'The working day of the employee',
    type: String,
    example: 'MATUTINO',
  })
  workingDay: string;

  @ApiProperty({
    description: 'The main department data of the employee',
    // type: () => EmployeeDepartmentDto, // Esta es la version "lazy"
    type: EmployeeDepartmentDto,
    example: {
      id: 1,
      key: 'A0001',
      name: 'Pharmacy',
    } as EmployeeDepartmentDto,
  })
  department: EmployeeDepartmentDto;

  @ApiProperty({
    description: 'The roles main data of the employee',
    type: [EmployeeRoleDto],
    example: [
      {
        id: 1,
        key: 'R0001',
        name: 'Chief Technology Officer',
      } as EmployeeRoleDto,
    ],
  })
  roles: [EmployeeRoleDto];
}

export class NewEmployeeDto {
  @ApiProperty({
    description: 'The key of the employee',
    type: String,
    example: 'E0001',
  })
  key: string;

  @ApiProperty({
    description: 'The name of the employee',
    type: String,
    example: 'Irving',
  })
  name: string;

  @ApiProperty({
    description: 'The last name of the employee',
    type: String,
    example: 'Salazar',
  })
  lastName: string;

  @ApiProperty({
    description: 'The maternal last name of the employee',
    type: String,
    example: 'Rivas',
  })
  maternalLastName: string | null;

  @ApiProperty({
    description: 'The RFC of the employee',
    type: String,
    example: 'VECJ880326XXX',
  })
  rfc: string | null;

  @ApiProperty({
    description: 'The CURP of the employee',
    type: String,
    example: 'RACW050729MMCSHNA2',
  })
  curp: string | null;

  @ApiProperty({
    description: 'The bank account number of the employee',
    type: String,
  })
  bankAccountNumber: string | null;

  @ApiProperty({
    description: 'The entry date of the employee',
    type: Date,
  })
  entryDate: Date;

  @ApiProperty({
    description: 'The departure date of the employee',
    type: Date,
  })
  departureDate: Date | null;

  @ApiProperty({
    description: 'The contract type of the employee',
    type: String,
    example: 'POR PROYECTO',
  })
  contractType: string;

  @ApiProperty({
    description: 'The salary type of the employee',
    type: String,
    example: 'POR HORA',
  })
  salaryType: string;

  @ApiProperty({
    description: 'The working day of the employee',
    type: String,
    example: 'MATUTINO',
  })
  workingDay: string;

  @ApiProperty({
    description: 'The main department data of the employee',
    type: EmployeeDepartmentDto,
    example: {
      id: 1,
      key: 'A0001',
      name: 'Pharmacy',
    } as EmployeeDepartmentDto,
  })
  department: EmployeeDepartmentDto;

  @ApiProperty({
    description: 'The roles main data of the employee',
    type: [EmployeeRoleDto],
    example: [
      {
        id: 1,
        key: 'R0001',
        name: 'Chief Technology Officer',
      } as EmployeeRoleDto,
    ],
  })
  roles: [EmployeeRoleDto];
}
/*
export class GetDeletedEmployeeRoleDto {
  @ApiProperty({
    description: 'The ID of the employee role (ID of the database)',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The current status of the employee role',
    type: Boolean,
    example: false,
  })
  active: boolean;

  @ApiProperty({
    description: 'The date it was created',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The last date it was updated',
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The key of the employee role',
    type: String,
    example: 'R0001',
  })
  key: string;

  @ApiProperty({
    description: 'The name of the employee role',
    type: String,
    example: 'Chief Technology Officer',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the employee role',
    type: String,
    example:
      'He is responsible for leading the technical and technological department of a company',
  })
  description: string | null;
}
*/
