import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './repository/comment.repository';
import { ICommentViewModel } from './interface/comment.interface';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  async getCommentById(id: string): Promise<ICommentViewModel | null> {
    return await this.commentsRepository.getCommentById(id);
  }
}
