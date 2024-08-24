import { User } from "./user.entity";

export class Cool {
  /**
   * Cool Id
   */
  _id?: string;
  /**
   * Cool Code.
   */
  code?: string;

  /**
   * Cool Name.
   */
  name?: string;

  /**
   * Cool Location.
   */
  location?: string;

  /**
   * Cool Description
   */
  description?: string;

  /**
   * Cool Members.
   */
  members?: string[] | User[];
}
