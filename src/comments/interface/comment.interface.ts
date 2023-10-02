import { QueryParamType } from '../../interfaces';

export interface ICommentViewModel {
  id: string;
  postId?: string;
  content: string;
  createdAt: string;
}

export interface ICommentSearchParams {
  sortBy: QueryParamType;
  sortDirection: QueryParamType;
  postId: string;
}
