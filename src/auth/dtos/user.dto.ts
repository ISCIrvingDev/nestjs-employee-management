import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({
    description: 'The name of the user',
    type: String,
    example: 'Your username',
  })
  username: string;

  @ApiProperty({ description: 'The password of the user', type: String })
  password: string;
}

export class UserRefreshJwtDto {
  @ApiProperty({
    description: 'The refresh JWT token of the user',
    type: String,
    example: 'Your password',
  })
  refreshToken: string;
}
