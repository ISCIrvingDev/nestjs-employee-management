import { ApiProperty } from '@nestjs/swagger';

const description = `The status of the response.
If true then the operation was successful, else there was an exception/error during the operation`;

export class AppResponseModel<T> {
  @ApiProperty({
    description: description,
    type: Boolean,
    example: true,
    required: true,
  })
  public success: boolean;

  @ApiProperty({
    description: 'The retrieved data during the operation',
    type: Object,
    required: true,
  })
  public data: T | AppErrorResponseModel;

  constructor(init?: Partial<AppResponseModel<T>>) {
    Object.assign(this, init);
  }
}

export class AppErrorResponseModel {
  @ApiProperty({
    description: 'The HTTP status code of the response',
    type: Number,
    example: 500,
    required: true,
  })
  public statusCode: number;

  @ApiProperty({
    description: 'The timestamp of the response',
    type: String,
    example: '2024-12-13T19:19:56.759Z',
    required: true,
  })
  public timestamp: string;

  @ApiProperty({
    description: 'The URL path of the request',
    type: String,
    example: '/api/auth/login',
    required: true,
  })
  public path: string;

  @ApiProperty({
    description: 'The error message of the operation',
    type: String,
    example: 'Invalid request!',
    required: true,
  })
  public message: string;

  constructor(init?: Partial<AppErrorResponseModel>) {
    Object.assign(this, init);
  }
}
