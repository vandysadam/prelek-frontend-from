import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../../api/api.query';
import { BaseResponse } from '../../api/api.types';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getMonthlyTransaction: builder.query<BaseResponse<any>, null>({
      query: () => {
        return {
          method: 'GET',
          url: `/statistic/monthly-transactions`,
        };
      },
    }),
  }),
});

export const { useGetMonthlyTransactionQuery } = dashboardApi;
