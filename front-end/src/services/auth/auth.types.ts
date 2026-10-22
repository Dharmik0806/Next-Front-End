/**
 * Authentication API Request & Response Types
 */

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface IAuthUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
}

export interface IAuthResponse {
  success?: boolean;
  message?: string;
  accessToken: string;
  refreshToken?: string;
  user?: IAuthUser;
}

export interface IRefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}
