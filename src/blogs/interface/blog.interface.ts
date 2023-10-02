import { QueryParamType } from '../../interfaces';

export interface IBlogViewModel {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
}

export interface IBlogSearchParams {
  searchNameTerm: QueryParamType;
  sortBy: QueryParamType;
  sortDirection: QueryParamType;
}
