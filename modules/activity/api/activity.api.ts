import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { ActivityEntity } from "../dtos/models/entity";
import { ActivityFilterRequest } from "../dtos/requests/activity-filter.request";

export const activityApi = createApi({
  reducerPath: "activityApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    createActivity: builder.mutation<BaseResponse<ActivityEntity>, FormData>({
      query: (formData) => {
        return {
          method: "POST",
          url: "/activities/create",
          data: formData,
        };
      },
    }),
    getAllActivityPaginated: builder.query<
      PaginationResponse<ActivityEntity[]>,
      ActivityFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/activities/",
          params: data,
        };
      },
    }),
  }),
});

export const { useCreateActivityMutation, useGetAllActivityPaginatedQuery } =
  activityApi;
