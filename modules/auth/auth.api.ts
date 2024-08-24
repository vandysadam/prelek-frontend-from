import { createApi } from '@reduxjs/toolkit/query/react';

import { apiBaseQuery } from '../api/api.query';
import { BaseResponse } from '../api/api.types';

import { LoginRequest, LoginResponseDto } from './auth.types';

export const AUTH_API_REDUCER_KEY = 'authApi';

export const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    authLogin: builder.mutation<BaseResponse<LoginResponseDto>, LoginRequest>({
      query: (data) => {
        return {
          method: 'POST',
          url: '/auth/admin/login',
          data,
        };
      },
    }),
    // requestForgotPassword: builder.mutation<
    //   BaseResponse<string>,
    //   IForgotPasswordRequest
    // >({
    //   query: (data) => {
    //     return {
    //       method: 'POST',
    //       url: '/api/auth/forgot-password',
    //       data,
    //     };
    //   },
    // }),
    // profile: builder.query<BaseResponse<User>, null>({
    //   query: () => {
    //     return {
    //       method: "GET",
    //       url: "/api/auth/profile",
    //     };
    //   },
    // }),
  }),
});

export const { useAuthLoginMutation } = authApi;
