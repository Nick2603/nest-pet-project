import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CommentsService } from './comment.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get(':id')
  async getCommentById(@Res() response: Response, @Param('id') id: string) {
    const comment = await this.commentsService.getCommentById(id);
    if (comment) {
      response.status(200).send(comment);
      return;
    }
    response.sendStatus(HttpStatus.NOT_FOUND);
  }
}
