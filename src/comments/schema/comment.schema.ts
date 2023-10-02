import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true, immutable: true, alias: 'id', default: uuidv4 })
  _id: string;

  @Prop({ required: false })
  postId?: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  createdAt: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
