import { Injectable } from '@nestjs/common';
import { BlogsRepository } from './repository/blog.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { IBlogViewModel } from './interface/blog.interface';

@Injectable()
export class BlogsService {
  constructor(private blogsRepository: BlogsRepository) {}

  async createBlog(createBlogDto: CreateBlogDto): Promise<IBlogViewModel> {
    return this.blogsRepository.createBlog(createBlogDto);
  }

  async getBlogById(id: string): Promise<IBlogViewModel | null> {
    return await this.blogsRepository.getBlogById(id);
  }

  async updateBlog(id: string, updateBlogDto: UpdateBlogDto): Promise<boolean> {
    return this.blogsRepository.updateBlog(id, updateBlogDto);
  }

  async deleteBlog(id: string): Promise<boolean> {
    return await this.blogsRepository.deleteBlog(id);
  }
}
