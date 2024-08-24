// import { UserRoleEnum } from '../../enums/user-role.enum';

export interface User {
  user_id: string;
  name: string;
  password: string;
  house_number: number;
  roles: string;
  phone_number: string;
  address: string;
}

/**
 * Organization-scoped roles used by Iqam Global / Ommar.net.
 */
export enum ROLE_TYPE_ENUM {
  ADMIN = 'ADMIN',
  FINANCE = 'FINANCE',
  OPERATOR = 'OPERATOR',
  GUEST = 'GUEST',
}

export type RoleType = keyof typeof ROLE_TYPE_ENUM;

export interface CurrentUserDTO {
  id: string;
  name: string;
  roles: RoleType;
  house_number: number;
  email: String;
}
