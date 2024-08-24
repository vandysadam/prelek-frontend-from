// import { LoginRequest, LoginResponse } from "./types";

import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { Cool } from "../dtos/models/cool.entity";

import { CoolFilterRequest } from "../dtos/requests/cool-filter.request";

// import { Auth } from "./types";

export const coolApi = createApi({
  reducerPath: "coolApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getAllCool: builder.query<PaginationResponse<Cool[]>, CoolFilterRequest>({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/cools",
          params: data,
        };
      },
    }),
    getCoolDetail: builder.query<BaseResponse<Cool>, { id: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/cools/${data.id}`,
        };
      },
    }),
    createCool: builder.mutation<BaseResponse<Cool>, Cool>({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/cools",
          data,
        };
      },
    }),
    updateCool: builder.mutation<BaseResponse<Cool>, Cool>({
      query: (data) => {
        return {
          method: "PUT",
          url: `/api/cools/${data._id}`,
          data,
        };
      },
    }),
    deleteCool: builder.mutation<BaseResponse<Cool>, { id: string }>({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/api/cools/${data.id}`,
        };
      },
    }),
  }),
});

export const {
  useGetAllCoolQuery,
  useGetCoolDetailQuery,
  useCreateCoolMutation,
  useUpdateCoolMutation,
  useDeleteCoolMutation,
} = coolApi;
