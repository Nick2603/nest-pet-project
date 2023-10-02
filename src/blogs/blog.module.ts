import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schema/blog.schema';
import { BlogsController } from './blog.controller';
import { BlogsService } from './blog.service';
import { BlogsRepository } from './repository/blog.repository';
import { BlogsQueryRepository } from './repository/blog.queryRepository';
import { Post, PostSchema } from '../posts/schema/post.schema';
import { PostsService } from '../posts/post.service';
import { PostsQueryRepository } from '../posts/repository/post.queryRepository';
import { PostsRepository } from '../posts/repository/post.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [BlogsController],
  providers: [
    BlogsService,
    BlogsRepository,
    BlogsQueryRepository,
    PostsService,
    PostsQueryRepository,
    PostsRepository,
  ],
})
export class BlogsModule {}
