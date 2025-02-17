import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetDepartmentDto {
  @ApiProperty({
    description: 'The ID of the department (ID of the database)',
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

  @ApiProperty({
    description: 'The description of the department',
    type: String,
    example:
      'Area of ​​pharmacists, pharmacy technicians and customer service personnel',
  })
  description: string | null;
}

export class NewDepartmentDto {
  @ApiProperty({
    description: 'The key of the department',
    type: String,
    example: 'A0001',
  })
  @IsString({ message: 'The key must be a string' })
  @IsNotEmpty({ message: 'The key cannot be empty' })
  @Length(5, 5, { message: 'The key must be 5 character length' })
  key: string; // Validaciones agregadas primero en el Front

  @ApiProperty({
    description: 'The name of the department',
    type: String,
    example: 'Pharmacy',
  })
  @IsString({ message: 'The name must be a string' })
  @IsNotEmpty({ message: 'The name cannot be empty' })
  @Length(4, 35, {
    message: 'The name must have at least 4 and maximum 35 characters',
  })
  name: string; // Validaciones agregadas primero en el Front

  @ApiProperty({
    description: 'The description of the department',
    type: String,
    example:
      'Area of ​​pharmacists, pharmacy technicians and customer service personnel',
  })
  description: string | null;
}

export class GetDeletedDepartmentDto {
  @ApiProperty({
    description: 'The ID of the department (ID of the database)',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The current status of the department',
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

  @ApiProperty({
    description: 'The description of the department',
    type: String,
    example:
      'Area of ​​pharmacists, pharmacy technicians and customer service personnel',
  })
  description: string | null;
}
