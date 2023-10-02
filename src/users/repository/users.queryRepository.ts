import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model, SortOrder } from 'mongoose';
import { IUserSearchParams, IUserViewModel } from '../interface/user.interface';
import { PaginatedInputType, PaginatedResponseType } from '../../interfaces';
import { mapUserDBTypeToViewType } from '../../mappers/mapUserDBTypeToViewType';

@Injectable()
export class UsersQueryRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers({
    searchEmailTerm,
    searchLoginTerm,
    sortBy = 'createdAt',
    sortDirection = 'desc',
    pageNumber = '1',
    pageSize = '10',
  }: IUserSearchParams & PaginatedInputType): Promise<User[]> {
    const filter: any = {};

    if (searchLoginTerm) {
      filter.login = {
        $regex: searchLoginTerm,
        $options: 'i',
      };
    }

    if (searchEmailTerm) {
      filter.email = {
        $regex: searchEmailTerm,
        $options: 'i',
      };
    }

    return await this.userModel
      .find(filter)
      .sort({ [sortBy.toString()]: sortDirection as SortOrder })
      .skip((+pageNumber - 1) * +pageSize)
      .limit(+pageSize)
      .exec();
  }

  async getUsersPaginated({
    searchEmailTerm,
    searchLoginTerm,
    sortBy = 'createdAt',
    sortDirection = 'desc',
    pageNumber = '1',
    pageSize = '10',
  }: IUserSearchParams & PaginatedInputType): Promise<
    PaginatedResponseType<IUserViewModel>
  > {
    const filter: any = {};

    if (searchLoginTerm) {
      filter.login = {
        $regex: searchLoginTerm,
        $options: 'i',
      };
    }

    if (searchEmailTerm) {
      filter.email = {
        $regex: searchEmailTerm,
        $options: 'i',
      };
    }

    const totalCount = await this.userModel.countDocuments(filter);
    const users = await this.getUsers({
      searchEmailTerm,
      searchLoginTerm,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
    });

    return {
      pagesCount: Math.ceil(totalCount / +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount,
      items: users.map(mapUserDBTypeToViewType),
    };
  }
}
