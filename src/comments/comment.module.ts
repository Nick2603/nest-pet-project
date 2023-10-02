import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schema/comment.schema';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';
import { CommentsRepository } from './repository/comment.repository';
import { CommentsQueryRepository } from './repository/comment.queryRepository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, CommentsQueryRepository],
})
export class CommentsModule {}
