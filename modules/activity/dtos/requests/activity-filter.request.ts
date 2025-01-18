import { BasePaginationFilter } from "../../../api/api.types";

export class ActivityFilterRequest extends BasePaginationFilter {
  search_params?: string;
  title?: string;
  description?: string;
}
export class addUserFilterRequest {
  name!: string;
  password!: string;
  house_number!: number;
  roles!: string;
  phone_number!: string;
  address!: string;
}
