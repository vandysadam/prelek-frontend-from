export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  FINANCE = 'FINANCE',
  OPERATOR = 'OPERATOR',
  GUEST = 'GUEST',
  CUSTOMER = 'CUSTOMER'
}

export enum CompanyRoleEnum {
  COMPANY_ADMIN = 'company_admin',
  COMPANY_PIC = 'company_pic',
  EMPLOYEE = 'employee'
}

export type CompanyRole = 'company_admin' | 'company_pic' | 'employee';

export const userRoleToCompanyRole = {
  company_admin: CompanyRoleEnum.COMPANY_ADMIN,
  company_pic: CompanyRoleEnum.COMPANY_PIC,
  employee: CompanyRoleEnum.EMPLOYEE
};

export const companyRoleToReadable = (role: any): string => {
  if (role !== '' && role !== null) {
    // console.log("role", role);
    return role === 'company_admin'
      ? 'Admin'
      : role === 'company_pic'
      ? 'PIC'
      : role === 'employee'
      ? 'Employee'
      : '';
  }
  return '';
};

export const companyReadableToCompanyRoleEnum = {
  Admin: 'company_admin',
  PIC: 'company_pic',
  Employee: 'employee'
};
