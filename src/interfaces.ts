import { ParsedQs } from 'qs';

export type QueryParamType =
  | string
  | string[]
  | ParsedQs
  | ParsedQs[]
  | undefined;

export type PaginatedInputType = {
  pageNumber: QueryParamType;
  pageSize: QueryParamType;
};

export type PaginatedResponseType<T> = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
};
