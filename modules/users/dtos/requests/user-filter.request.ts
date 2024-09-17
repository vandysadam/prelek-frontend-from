import { UserRoleEnum } from '../../enums/user-role.enum';
import { BasePaginationFilter } from '../../../api/api.types';

export class UserFilterRequest extends BasePaginationFilter {
  search_params?: string;
  username?: string;
  fullName?: string;
  email?: string;
  role?: UserRoleEnum;
  phoneNumber?: string;
  creatorId?: string;
}
export class addUserFilterRequest {
  name!: string;
  password!: string;
  house_number!: number;
  roles!: string;
  phone_number!: string;
  address!: string;
}
