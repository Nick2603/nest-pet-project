import { QueryParamType } from '../../interfaces';

export interface IPostViewModel {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
}

export interface IPostSearchParams {
  title: QueryParamType;
  sortBy: QueryParamType;
  sortDirection: QueryParamType;
  blogId?: string;
}
