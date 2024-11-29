export interface UserJwtModel {
  id: number;
  username: string;
}

export interface JwtTokensModel {
  accessToken: string;
  refreshToken?: string;
}
