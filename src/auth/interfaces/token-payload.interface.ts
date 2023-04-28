export interface ITokenPayload {
  email: string;
  sub: number;
}

export interface IRefreshTokenPayload extends ITokenPayload {
  refreshToken: string;
}
