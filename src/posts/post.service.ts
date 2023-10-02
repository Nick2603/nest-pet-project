import { Injectable } from '@nestjs/common';
import { PostsRepository } from './repository/post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { IPostViewModel } from './interface/post.interface';
import { BlogsRepository } from '../blogs/repository/blog.repository';

@Injectable()
export class PostsService {
  constructor(
    private postsRepository: PostsRepository,
    private blogsRepository: BlogsRepository,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<IPostViewModel> {
    const blog = await this.blogsRepository.getBlogById(createPostDto.blogId);
    const data = {
      ...createPostDto,
      blogName: blog!.name,
    };

    return this.postsRepository.createPost(data);
  }

  async getPostById(id: string): Promise<IPostViewModel | null> {
    return await this.postsRepository.getPostById(id);
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<boolean> {
    const blog = await this.blogsRepository.getBlogById(updatePostDto.blogId);
    const data = {
      ...updatePostDto,
      blogName: blog!.name,
    };

    return this.postsRepository.updatePost(id, data);
  }

  async deletePost(id: string): Promise<boolean> {
    return await this.postsRepository.deletePost(id);
  }
}
