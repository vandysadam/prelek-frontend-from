import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../../api/api.query';
import { BaseResponse, PaginationResponse } from '../../api/api.types';
import { User } from '../dtos/models/entity';
import { UserFilterRequest } from '../dtos/requests/user-filter.request';

// import { LoginRequest, LoginResponse } from "./types";

// import { Auth } from "./types";

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    createUser: builder.mutation<BaseResponse<User>, User>({
      query: (data) => {
        return {
          method: 'POST',
          url: '/api/users',
          data,
        };
      },
    }),
    getAllUserPaginated: builder.query<
      PaginationResponse<User[]>,
      UserFilterRequest
    >({
      query: (data) => {
        return {
          method: 'GET',
          url: '/users',
          params: data,
        };
      },
    }),
    getAllUser: builder.query<PaginationResponse<User[]>, UserFilterRequest>({
      query: (data) => {
        return {
          method: 'GET',
          url: '/users/userlist',
          params: data,
        };
      },
    }),
    getPicList: builder.query<BaseResponse<User[]>, UserFilterRequest>({
      query: (data) => {
        return {
          method: 'GET',
          url: '/api/users/get-pic-list',
          params: data,
        };
      },
    }),
    getUserDetail: builder.query<BaseResponse<User>, { id: string }>({
      query: (data) => {
        return {
          method: 'GET',
          url: `/api/users/${data.id}`,
        };
      },
    }),
    getUserById: builder.query<BaseResponse<User>, { id: string }>({
      query: (data) => {
        return {
          method: 'GET',
          url: `/users/${data.id}`,
        };
      },
    }),
    verifyUser: builder.mutation<BaseResponse<User>, { id: string }>({
      query: ({ id }) => {
        return {
          method: 'POST',
          url: `/users/${id}/verify`,
        };
      },
    }),
    getCurrentUser: builder.query<BaseResponse<User>, null>({
      query: () => {
        return {
          method: 'GET',
          url: '/users/current-user',
        };
      },
    }),
    updateUser: builder.mutation<BaseResponse<User>, User>({
      query: (data) => {
        const { user_id, roles, ...form } = data;
        return {
          method: 'PUT',
          url: `/api/users/${data.user_id}`,
          data: { ...form },
        };
      },
    }),
    deleteUser: builder.mutation<BaseResponse<User>, { id: string }>({
      query: (data) => {
        return {
          method: 'DELETE',
          url: `/api/users/${data.id}`,
        };
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUserQuery,
  useGetAllUserPaginatedQuery,
  useGetCurrentUserQuery,
  useGetUserDetailQuery,
  useGetPicListQuery,
  useVerifyUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
