import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../schema/blog.schema';
import { Model, SortOrder } from 'mongoose';
import { IBlogSearchParams, IBlogViewModel } from '../interface/blog.interface';
import { PaginatedInputType, PaginatedResponseType } from '../../interfaces';
import { mapBlogDBTypeToViewType } from '../../mappers/mapBlogDBTypeToViewType';

@Injectable()
export class BlogsQueryRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async getBlogs({
    searchNameTerm,
    sortBy = 'createdAt',
    sortDirection = 'desc',
    pageNumber = '1',
    pageSize = '10',
  }: IBlogSearchParams & PaginatedInputType): Promise<Blog[]> {
    const filter: any = {};

    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: 'i' };
    }

    return await this.blogModel
      .find(filter)
      .sort({ [sortBy.toString()]: sortDirection as SortOrder })
      .skip((+pageNumber - 1) * +pageSize)
      .limit(+pageSize)
      .exec();
  }

  async getBlogsPaginated({
    searchNameTerm,
    sortBy = 'createdAt',
    sortDirection = 'desc',
    pageNumber = '1',
    pageSize = '10',
  }: IBlogSearchParams & PaginatedInputType): Promise<
    PaginatedResponseType<IBlogViewModel>
  > {
    const filter: any = {};

    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: 'i' };
    }

    const totalCount = await this.blogModel.countDocuments(filter);

    const blogs = await this.getBlogs({
      searchNameTerm,
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
      items: blogs.map(mapBlogDBTypeToViewType),
    };
  }
}
