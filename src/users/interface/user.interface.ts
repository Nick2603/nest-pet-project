import { QueryParamType } from '../../interfaces';

export interface IUserViewModel {
  id: string;
  login: string;
  email: string;
  createdAt: string;
}

export interface IUserSearchParams {
  searchLoginTerm: QueryParamType;
  searchEmailTerm: QueryParamType;
  sortBy: QueryParamType;
  sortDirection: QueryParamType;
}
