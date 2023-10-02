import { IBlogViewModel } from '../blogs/interface/blog.interface';
import { Blog } from '../blogs/schema/blog.schema';

export const mapBlogDBTypeToViewType = (blog: Blog): IBlogViewModel => {
  return {
    id: blog._id,
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
  };
};
