import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { BlogsService } from './blog.service';
import { BlogsQueryRepository } from './repository/blog.queryRepository';
import { CreateBlogDto } from '../blogs/dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PostsService } from '../posts/post.service';
import { PostsQueryRepository } from '../posts/repository/post.queryRepository';
import { CreatePostDto } from '../posts/dto/create-post.dto';

@Controller('blogs')
export class BlogsController {
  constructor(
    private blogsService: BlogsService,
    private blogsQueryRepository: BlogsQueryRepository,
    private postsService: PostsService,
    private postsQueryRepository: PostsQueryRepository,
  ) {}

  @Get()
  getBlogs(
    @Query('searchNameTerm') searchNameTerm: string,
    @Query('sortBy') sortBy: string,
    @Query('sortDirection') sortDirection: string,
    @Query('pageNumber') pageNumber: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.blogsQueryRepository.getBlogsPaginated({
      searchNameTerm,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
    });
  }

  @Get(':id')
  async getBlogById(@Res() response: Response, @Param('id') id: string) {
    const blog = await this.blogsService.getBlogById(id);
    if (blog) {
      response.status(200).send(blog);
      return;
    }
    response.sendStatus(HttpStatus.NOT_FOUND);
  }

  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto) {
    return await this.blogsService.createBlog(createBlogDto);
  }

  @Put()
  async updateBlog(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    const result = await this.blogsService.updateBlog(id, updateBlogDto);
    if (result) {
      response.sendStatus(HttpStatus.NO_CONTENT);
    } else {
      response.sendStatus(HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async deleteBlog(@Res() response: Response, @Param('id') id: string) {
    const result = await this.blogsService.deleteBlog(id);
    if (result) {
      response.sendStatus(HttpStatus.NO_CONTENT);
      return;
    }
    response.sendStatus(HttpStatus.NOT_FOUND);
  }

  @Get('/:blogId/posts')
  async getPostsForBlog(
    @Res() response: Response,
    @Param('blogId') blogId: string,
    @Query('title') title: string,
    @Query('sortBy') sortBy: string,
    @Query('sortDirection') sortDirection: string,
    @Query('pageNumber') pageNumber: string,
    @Query('pageSize') pageSize: string,
  ) {
    const blog = await this.blogsService.getBlogById(blogId);
    if (blog) {
      const posts = await this.postsQueryRepository.getPostsPaginated({
        title,
        sortBy,
        sortDirection,
        pageNumber,
        pageSize,
        blogId,
      });

      response.status(200).send(posts);
      return;
    }
    response.sendStatus(HttpStatus.NOT_FOUND);
  }

  @Post('/:blogId/posts')
  async createPostForBlog(
    @Res() response: Response,
    @Body() createPostDto: Omit<CreatePostDto, 'blogId'>,
    @Param('blogId') blogId: string,
  ) {
    const blog = await this.blogsService.getBlogById(blogId);
    if (blog) {
      const newPost = await this.postsService.createPost({
        ...createPostDto,
        blogId,
      });
      response.status(HttpStatus.CREATED).send(newPost);
      return;
    }
    response.sendStatus(HttpStatus.NOT_FOUND);
  }
}
