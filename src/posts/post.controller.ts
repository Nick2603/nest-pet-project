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
import { PostsService } from './post.service';
import { PostsQueryRepository } from './repository/post.queryRepository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CommentsQueryRepository } from '../comments/repository/comment.queryRepository';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private postsQueryRepository: PostsQueryRepository,
    private commentsQueryRepository: CommentsQueryRepository,
  ) {}

  @Get()
  getPosts(
    @Query('title') title: string,
    @Query('blogId') blogId: string,
    @Query('sortBy') sortBy: string,
    @Query('sortDirection') sortDirection: string,
    @Query('pageNumber') pageNumber: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.postsQueryRepository.getPostsPaginated({
      title,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
      blogId,
    });
  }

  @Get(':id')
  async getPostById(@Res() response: Response, @Param('id') id: string) {
    const post = await this.postsService.getPostById(id);
    if (post) {
      response.status(200).send(post);
      return;
    }
    response.sendStatus(HttpStatus.NOT_FOUND);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.createPost(createPostDto);
  }

  @Put()
  async updatePost(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const result = await this.postsService.updatePost(id, updatePostDto);
    if (result) {
      response.sendStatus(HttpStatus.NO_CONTENT);
    } else {
      response.sendStatus(HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async deletePost(@Res() response: Response, @Param('id') id: string) {
    const result = await this.postsService.deletePost(id);
    if (result) {
      response.sendStatus(HttpStatus.NO_CONTENT);
      return;
    }
    response.sendStatus(HttpStatus.NOT_FOUND);
  }

  @Get()
  getCommentsForPost(
    @Query('postId') postId: string,
    @Query('sortBy') sortBy: string,
    @Query('sortDirection') sortDirection: string,
    @Query('pageNumber') pageNumber: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.commentsQueryRepository.getCommentsPaginated({
      postId,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
    });
  }
}
