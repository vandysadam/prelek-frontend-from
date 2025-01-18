import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { RootState } from '../../store';
import { ErrorResponse } from './api.types';

// import { wrapResponseWithLink } from "./utils";

const baseAxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_API_URL as string,
  // baseURL: process.env.REACT_APP_API_BASE_URL as string,
  baseURL: import.meta.env.VITE_APP_API_URL as string,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequestConfig> =>
  async (requestOpts, { getState }) => {
    try {
      const token = (getState() as RootState).authSlice.persistedToken;

      const isFormData = requestOpts.data instanceof FormData; // Check if the payload is FormData

      // console.log("token", token);
      const result = await baseAxiosInstance({
        ...requestOpts,
        headers: {
          ...requestOpts.headers,
          Authorization: `Bearer ${token}`,
          ...(isFormData
            ? { 'Content-Type': 'multipart/form-data' }
            : { 'Content-Type': 'application/json' }), // Remove Content-Type for FormData (it will be auto-set by the browser)
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
        } as ErrorResponse,
      };
    }
  };

export const apiBaseQuery = axiosBaseQuery();
