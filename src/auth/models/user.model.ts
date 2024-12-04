import { ApiProperty } from '@nestjs/swagger';

export class UserJwtModel {
  @ApiProperty({ description: 'The id of the user', type: Number, example: 1 })
  id: number;

  @ApiProperty({
    description: 'The name of the user',
    type: String,
    examples: ['Irving', 'Jose'],
  })
  username: string;
}

export class JwtTokensModel {
  @ApiProperty({
    description: 'The access JWT token of the user',
    type: String,
  })
  accessToken: string;

  @ApiProperty({
    description: 'The refresh JWT token of the user',
    required: false,
    type: String,
  })
  refreshToken?: string;
}
