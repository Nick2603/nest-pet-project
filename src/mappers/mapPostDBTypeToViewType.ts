import { IPostViewModel } from '../posts/interface/post.interface';
import { Post } from '../posts/schema/post.schema';

export const mapPostDBTypeToViewType = (post: Post): IPostViewModel => {
  return {
    id: post._id,
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt,
  };
};
