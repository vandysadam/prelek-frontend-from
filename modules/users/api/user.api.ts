import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../../api/api.query';
import { BaseResponse, PaginationResponse } from '../../api/api.types';
import { editUser, topUp, User, UserAdd } from '../dtos/models/entity';
import { UserFilterRequest } from '../dtos/requests/user-filter.request';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    createUser: builder.mutation<BaseResponse<UserAdd>, UserAdd>({
      query: (data) => {
        return {
          method: 'POST',
          url: '/users/create',
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
          url: `/users/${data.id}`,
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

    getMonthlyTransaction: builder.query<BaseResponse<any>, null>({
      query: () => {
        return {
          method: 'GET',
          url: `/statistic/monthly-transactions`,
        };
      },
    }),

    topupUser: builder.mutation<BaseResponse<topUp>, topUp>({
      query: (data) => {
        const { ...form } = data;
        return {
          method: 'POST',
          url: '/wallets/top-up',
          data: { ...form },
        };
      },
    }),

    updateUser: builder.mutation<BaseResponse<editUser>, editUser>({
      query: (data) => {
        const { user_id, ...form } = data;
        return {
          method: 'PUT',
          url: `/users/update/${data.user_id}`,
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

    getAllUserdashboard: builder.query<BaseResponse<any>, null>({
      query: () => ({
        method: 'GET',
        url: '/statistic/total-user',
      }),
    }),

    getIncomeExpansesTotalBalance: builder.query<BaseResponse<any>, null>({
      query: () => ({
        method: 'GET',
        url: '/statistic/totalbalance',
      }),
    }),

    getPieChart: builder.query<BaseResponse<any>, string | undefined>({
      query: (year) => ({
        method: 'GET',
        url: `/statistic/piechart?year=${year}`,
      }),
    }),

    getGroupByMonth: builder.query<BaseResponse<any>, null>({
      query: () => ({
        method: 'GET',
        url: '/statistic/gruoupbymonth',
      }),
    }),
  }),
});

export const {
  useGetPieChartQuery,
  useGetIncomeExpansesTotalBalanceQuery,
  useGetAllUserdashboardQuery,
  useCreateUserMutation,
  useGetAllUserQuery,
  useGetAllUserPaginatedQuery,
  useGetCurrentUserQuery,
  useGetUserDetailQuery,
  useGetMonthlyTransactionQuery,
  useGetPicListQuery,
  useVerifyUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useTopupUserMutation,
} = userApi;
