import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/post.schema';
import { PostsController } from './post.controller';
import { PostsService } from './post.service';
import { PostsRepository } from './repository/post.repository';
import { PostsQueryRepository } from './repository/post.queryRepository';
import { BlogsRepository } from '../blogs/repository/blog.repository';
import { Blog, BlogSchema } from '../blogs/schema/blog.schema';
import { CommentsQueryRepository } from '../comments/repository/comment.queryRepository';
import { Comment, CommentSchema } from '../comments/schema/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Blog.name, schema: BlogSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsRepository,
    PostsQueryRepository,
    BlogsRepository,
    CommentsQueryRepository,
  ],
})
export class PostsModule {}
