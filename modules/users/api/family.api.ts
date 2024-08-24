// import { LoginRequest, LoginResponse } from "./types";

import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { Family } from "../dtos/models/family.entity";
import { FamilyFilterRequest } from "../dtos/requests/family-filter.request";

// import { Auth } from "./types";

export const familyApi = createApi({
  reducerPath: "familyApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getAllFamily: builder.query<
      PaginationResponse<Family[]>,
      FamilyFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/families",
          params: data,
        };
      },
    }),
    getFamilyDetail: builder.query<BaseResponse<Family>, { id: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/families/${data.id}`,
        };
      },
    }),
    createFamily: builder.mutation<BaseResponse<Family>, Family>({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/families",
          data,
        };
      },
    }),
    updateFamily: builder.mutation<BaseResponse<Family>, Family>({
      query: (data) => {
        return {
          method: "PUT",
          url: `/api/families/${data._id}`,
          data,
        };
      },
    }),
    deleteFamily: builder.mutation<BaseResponse<Family>, { id: string }>({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/api/families/${data.id}`,
        };
      },
    }),
  }),
});

export const {
  useGetAllFamilyQuery,
  useGetFamilyDetailQuery,
  useCreateFamilyMutation,
  useDeleteFamilyMutation,
  useUpdateFamilyMutation,
} = familyApi;
