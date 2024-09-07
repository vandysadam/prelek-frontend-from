import { AxiosRequestHeaders } from 'axios';

declare module '@reduxjs/toolkit/query/react' {
  export interface FetchArgs {
    headers?: AxiosRequestHeaders;
  }
}

export class BasePaginationFilter {
  page?: number = 1;
  limit?: number = 0;
  sort_direction?: string;
  sort_by?: string;
}

export interface LinkHeaderEntry {
  page: string;
  per_page: string;
  rel: string;
  sha: string;
  url: string;
}

export interface BaseResponse<T> {
  data: T;
  statusCode: number;
  message: string;
}

export interface PaginationResponse<T> extends BaseResponse<T> {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
  limit: number;
  total: number;
}

export interface ResponseWithLink<T> {
  response: T;
  next?: LinkHeaderEntry;
  last?: LinkHeaderEntry;
  prev?: LinkHeaderEntry;
  first?: LinkHeaderEntry;
}

export interface ErrorData {
  error: any;
  message: string;
  path: string;
  statusCode: number;
  timestamp: string;
}

export interface ErrorResponse {
  status: number;
  data: ErrorData;
}
