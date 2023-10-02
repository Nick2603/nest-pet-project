import { Controller, Delete } from '@nestjs/common';
import { BlogsRepository } from './../blogs/repository/blog.repository';
import { UsersRepository } from '../users/repository/users.repository';
import { CommentsRepository } from '../comments/repository/comment.repository';

@Controller('testing')
export class TestingController {
  constructor(
    private usersRepository: UsersRepository,
    private blogsRepository: BlogsRepository,
    private commentsRepository: CommentsRepository,
  ) {}

  @Delete('all-data')
  async deleteAllData() {
    await this.usersRepository.deleteAllUsers();
    await this.blogsRepository.deleteAllBlogs();
    await this.commentsRepository.deleteAllComments();
    return;
  }
}
