import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from '../schema/comment.schema';
import { Model } from 'mongoose';
import { mapCommentDBTypeToViewType } from '../../mappers/mapCommentDBTypeToViewType';
import { ICommentViewModel } from '../interface/comment.interface';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async deleteAllComments(): Promise<void> {
    await this.commentModel.deleteMany({});
  }

  async getCommentById(id: string): Promise<ICommentViewModel | null> {
    const foundComment = await this.commentModel.findOne({ _id: id });
    if (foundComment) {
      return mapCommentDBTypeToViewType(foundComment);
    }
    return null;
  }
}
