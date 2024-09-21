// ----------------- USER
export interface User {
  accessToken: any;
  user: any;
  user_id: string;
  name: string;
  password: string;
  house_number: number;
  roles: string;
  phone_number: string;
  address: string;
  wallet?: WalletEntity;
}
// ----------------- USER

export interface editUser {
  user_id?: string;
  name?: string;
  password?: string;
  house_number?: number;
  roles?: string;
  phone_number?: string;
  address?: string;
}

export interface topUp {
  house_number?: number;
  amount?: number;
}

export interface UserAdd {
  name: string;
  password: string;
  house_number: number;
  phone_number: string;
  address: string;
}

// ----------------- WALLET
export interface WalletEntity {
  id: string;
  userid: string;
  balance: number;
  type: string;
  user?: CurrentUserDTO;
}

export enum WALLET_TYPE_ENUM {
  NORMAL = 'NORMAL', // dompet warga
  VAULT = 'VAULT', // penyimpanan kas / DOMPET ADMIN
}

export type WALLET_TYPE = keyof typeof WALLET_TYPE_ENUM;
// ----------------- WALLET

// ----------------- ROLE
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

// ----------------- ROLE

// ----------------- Current User
export interface CurrentUserDTO {
  id: string;
  name: string;
  roles: RoleType;
  house_number: number;
  email: String;
}
