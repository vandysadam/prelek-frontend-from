import { BaseFilterRequest } from "../../../core/base-filter.request";
import { UserRoleEnum } from "../../enums/user-role.enum";

export class UserFilterRequest extends BaseFilterRequest {
  username?: string;
  fullName?: string;
  email?: string;
  role?: UserRoleEnum;
  phoneNumber?: string;
  creatorId?: string;
}
