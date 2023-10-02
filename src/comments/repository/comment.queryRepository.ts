import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from '../schema/comment.schema';
import { Model, SortOrder } from 'mongoose';
import {
  ICommentSearchParams,
  ICommentViewModel,
} from '../interface/comment.interface';
import { PaginatedInputType, PaginatedResponseType } from '../../interfaces';
import { mapCommentDBTypeToViewType } from '../../mappers/mapCommentDBTypeToViewType';

@Injectable()
export class CommentsQueryRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async getComments({
    sortBy = 'createdAt',
    sortDirection = 'desc',
    pageNumber = '1',
    pageSize = '10',
    postId,
  }: ICommentSearchParams & PaginatedInputType): Promise<Comment[]> {
    const filter: any = {};

    if (postId) {
      filter.postId = postId;
    }

    return await this.commentModel
      .find(filter)
      .sort({ [sortBy.toString()]: sortDirection as SortOrder })
      .skip((+pageNumber - 1) * +pageSize)
      .limit(+pageSize)
      .exec();
  }

  async getCommentsPaginated({
    sortBy = 'createdAt',
    sortDirection = 'desc',
    pageNumber = '1',
    pageSize = '10',
    postId,
  }: ICommentSearchParams & PaginatedInputType): Promise<
    PaginatedResponseType<ICommentViewModel>
  > {
    const filter: any = {};

    if (postId) {
      filter.postId = postId;
    }

    const totalCount = await this.commentModel.countDocuments(filter);

    const comments = await this.getComments({
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
      postId,
    });

    return {
      pagesCount: Math.ceil(totalCount / +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount,
      items: comments.map(mapCommentDBTypeToViewType),
    };
  }
}
