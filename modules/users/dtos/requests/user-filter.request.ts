import { UserRoleEnum } from '../../enums/user-role.enum';
import { BasePaginationFilter } from '../../../api/api.types';

export class UserFilterRequest extends BasePaginationFilter {
  username?: string;
  fullName?: string;
  email?: string;
  role?: UserRoleEnum;
  phoneNumber?: string;
  creatorId?: string;
}
