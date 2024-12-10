import { ApiProperty } from '@nestjs/swagger';

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
