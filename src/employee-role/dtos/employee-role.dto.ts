import { ApiProperty } from '@nestjs/swagger';

export class GetEmployeeRoleDto {
  @ApiProperty({
    description: 'The ID of the employee role (ID of the database)',
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

export class NewEmployeeRoleDto {
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
