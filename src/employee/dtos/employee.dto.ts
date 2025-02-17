import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  // IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import {
  ContractTypeEnum,
  SalaryTypeEnum,
  WorkingDayEnum,
} from '../enums/employee.enum';
import { Type } from 'class-transformer';
import { CEmployee } from 'src/application/db/employee-management-db/entities/c-employee.entity';
// import * as NewEmployeeDtoExtensions from './extensions/new-employee-dto.extension';

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
  // Data type conversions
  public constructor(init?: Partial<EmployeeRoleDto>) {
    Object.assign(this, init);
  }

  // DTO properties
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
  // Data type conversions
  public constructor(init?: Partial<GetEmployeeDto>) {
    Object.assign(this, init);
  }

  static fromCEmployee: (cEmployee: CEmployee) => GetEmployeeDto;

  // DTO properties
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
    enum: ContractTypeEnum,
    examples: [
      ContractTypeEnum.PerProject,
      ContractTypeEnum.Permanent,
      ContractTypeEnum.SixMonths,
      ContractTypeEnum.ThreeMonths,
    ],
  })
  contractType: string;

  @ApiProperty({
    description: 'The salary type of the employee',
    type: String,
    enum: SalaryTypeEnum,
    examples: [
      SalaryTypeEnum.Fixed,
      SalaryTypeEnum.PerCommission,
      SalaryTypeEnum.PerHour,
      SalaryTypeEnum.Variable,
    ],
  })
  salaryType: string;

  @ApiProperty({
    description: 'The working day of the employee',
    type: String,
    enum: WorkingDayEnum,
    examples: [
      WorkingDayEnum.Morning,
      WorkingDayEnum.Evening,
      WorkingDayEnum.Night,
    ],
  })
  workingDay: string;

  @ApiProperty({
    description: 'The main department data of the employee',
    // type: () => EmployeeDepartmentDto, // Esta es la version "lazy"
    type: EmployeeDepartmentDto,
    // oneOf: [
    //   { $ref: getSchemaPath(EmployeeDepartmentDto) },
    //   // {
    //   //   properties: {
    //   //     // type: getSchemaPath(EmployeeDepartmentDto),
    //   //     // $ref: getSchemaPath(EmployeeDepartmentDto),
    //   //     type: {
    //   //       $ref: getSchemaPath(EmployeeDepartmentDto),
    //   //     },
    //   //   },
    //   // },
    // ],
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
  roles: EmployeeRoleDto[];
}

export class NewEmployeeDto {
  // Data type conversions
  public constructor(init?: Partial<NewEmployeeDto>) {
    Object.assign(this, init);
  }

  // Como se tuvo que envolver los metodos de conversion como una entidad separada a "NewEmployeeDto", ya se mandara a llamar directamente desde el servicio como una capa separada al DTO
  // toCEmployee: (this: NewEmployeeDto) => CEmployee =
  //   NewEmployeeDtoExtensions.toCEmployee;
  // fromCEmployee: (cEmployee: CEmployee) => NewEmployeeDto =
  //   NewEmployeeDtoExtensions.fromCEmployee;

  // DTO properties
  @ApiProperty({
    description: 'The key of the employee',
    type: String,
    example: 'E0001',
  })
  @IsString({ message: 'The key must be a string' })
  @IsNotEmpty({ message: 'The key cannot be empty' })
  @Length(5, 5, { message: 'The key must be 5 character length' })
  key: string;

  @ApiProperty({
    description: 'The name of the employee',
    type: String,
    example: 'Irving',
  })
  @IsString({ message: 'The name must be a string' })
  @IsNotEmpty({ message: 'The name cannot be empty' })
  @Length(4, 35, {
    message: 'The name must have at least 4 and maximum 35 characters',
  })
  name: string;

  @ApiProperty({
    description: 'The last name of the employee',
    type: String,
    example: 'Salazar',
  })
  @IsString({ message: 'The last name must be a string' })
  @IsNotEmpty({ message: 'The last name cannot be empty' })
  @Length(4, 35, {
    message: 'The last name must have at least 4 and maximum 35 characters',
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
    example: new Date(),
  })
  // @IsDate({ message: 'The entry date must be a valid date' })  // Sale error cuando se envia un string date ya que esta esperando una instancia de "Date"
  // Permite recibir un date valido en formato de string
  @IsDateString(
    {},
    { message: 'The entry date must be a valid ISO 8601 date string' },
  )
  @IsNotEmpty({ message: 'The entry date cannot be empty' })
  entryDate: Date;

  @ApiProperty({
    description: 'The departure date of the employee',
    type: Date,
  })
  departureDate: Date | null;

  @ApiProperty({
    description: 'The contract type of the employee',
    type: String,
    enum: ContractTypeEnum,
    examples: [
      ContractTypeEnum.PerProject,
      ContractTypeEnum.Permanent,
      ContractTypeEnum.SixMonths,
      ContractTypeEnum.ThreeMonths,
    ],
  })
  @IsEnum(ContractTypeEnum, { message: 'The contract type cannot be empty' })
  contractType: string;

  @ApiProperty({
    description: 'The salary type of the employee',
    type: String,
    enum: SalaryTypeEnum,
    examples: [
      SalaryTypeEnum.Fixed,
      SalaryTypeEnum.PerCommission,
      SalaryTypeEnum.PerHour,
      SalaryTypeEnum.Variable,
    ],
  })
  @IsNotEmpty({ message: 'The salary type cannot be empty' })
  @IsEnum(SalaryTypeEnum, {
    message: 'The salary type must be a valid value listed in the example',
  })
  salaryType: string;

  @ApiProperty({
    description: 'The working day of the employee',
    type: String,
    enum: WorkingDayEnum,
    examples: [
      WorkingDayEnum.Morning,
      WorkingDayEnum.Evening,
      WorkingDayEnum.Night,
    ],
  })
  @IsEnum(WorkingDayEnum, { message: 'The working day cannot be empty' })
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
  @ValidateNested({ message: 'The main department data cannot be empty' })
  @Type(() => EmployeeDepartmentDto)
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
  @IsArray({ message: 'The roles department data cannot be empty' })
  @ValidateNested({ message: 'The main department data cannot be empty' })
  @Type(() => EmployeeRoleDto)
  roles: EmployeeRoleDto[];
}
