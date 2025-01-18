import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../../api/api.query';
import { BaseResponse } from '../../api/api.types';
import { ActivityEntity } from '../dtos/models/entity';

export const activityApi = createApi({
  reducerPath: 'activityApi',
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    createActivity: builder.mutation<BaseResponse<ActivityEntity>, FormData>({
      query: (formData) => {
        return {
          method: 'POST',
          url: '/activities/create',
          data: formData,
        };
      },
    }),
  }),
});

export const { useCreateActivityMutation } = activityApi;
