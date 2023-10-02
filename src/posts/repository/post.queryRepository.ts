import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schema/post.schema';
import { Model, SortOrder } from 'mongoose';
import { IPostSearchParams, IPostViewModel } from '../interface/post.interface';
import { PaginatedInputType, PaginatedResponseType } from '../../interfaces';
import { mapPostDBTypeToViewType } from '../../mappers/mapPostDBTypeToViewType';

@Injectable()
export class PostsQueryRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async getPosts({
    title,
    sortBy = 'createdAt',
    sortDirection = 'desc',
    pageNumber = '1',
    pageSize = '10',
    blogId,
  }: IPostSearchParams & PaginatedInputType): Promise<Post[]> {
    const filter: any = {};

    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    if (blogId) {
      filter.blogId = blogId;
    }

    return await this.postModel
      .find(filter)
      .sort({ [sortBy.toString()]: sortDirection as SortOrder })
      .skip((+pageNumber - 1) * +pageSize)
      .limit(+pageSize)
      .exec();
  }

  async getPostsPaginated({
    title,
    sortBy = 'createdAt',
    sortDirection = 'desc',
    pageNumber = '1',
    pageSize = '10',
    blogId,
  }: IPostSearchParams & PaginatedInputType): Promise<
    PaginatedResponseType<IPostViewModel>
  > {
    const filter: any = {};

    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    if (blogId) {
      filter.blogId = blogId;
    }

    const totalCount = await this.postModel.countDocuments(filter);

    const posts = await this.getPosts({
      title,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
      blogId,
    });

    return {
      pagesCount: Math.ceil(totalCount / +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount,
      items: posts.map(mapPostDBTypeToViewType),
    };
  }
}
