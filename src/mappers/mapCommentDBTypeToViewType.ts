import { ICommentViewModel } from '../comments/interface/comment.interface';
import { Comment } from '../comments/schema/comment.schema';

export const mapCommentDBTypeToViewType = (
  comment: Comment,
): ICommentViewModel => {
  return {
    id: comment._id,
    content: comment.content,
    createdAt: comment.createdAt,
  };
};
