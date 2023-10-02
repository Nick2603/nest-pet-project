import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema/user.schema';
import { UsersRepository } from '../users/repository/users.repository';
import { TestingController } from './testing.controller';
import { HashService } from '../common/HashService';
import { Blog, BlogSchema } from '../blogs/schema/blog.schema';
import { BlogsRepository } from '../blogs/repository/blog.repository';
import { Comment, CommentSchema } from '../comments/schema/comment.schema';
import { CommentsRepository } from '../comments/repository/comment.repository';
import { Post, PostSchema } from '../posts/schema/post.schema';
import { PostsRepository } from '../posts/repository/post.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Blog.name, schema: BlogSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [TestingController],
  providers: [
    UsersRepository,
    BlogsRepository,
    HashService,
    CommentsRepository,
    PostsRepository,
  ],
})
export class TestingModule {}
