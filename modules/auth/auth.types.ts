import { CurrentUserDTO } from '../users/dtos/models/user.entity';

export interface AuthState {
  isAuthenticated: boolean;
  user: CurrentUserDTO | null;
  persistedToken: string;
}

export interface LoginRequest {
  login_id: string;
  password: string;
}

export interface LoginResponseDto {
  user: CurrentUserDTO;
  accessToken: string;
  refreshToken: string;
}

export interface IForgotPasswordRequest {
  source: 'user' | 'employee';
  email: string;
  platform: 'web' | 'mobile';
}
