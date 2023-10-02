import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schema/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { mapPostDBTypeToViewType } from '../../mappers/mapPostDBTypeToViewType';
import { IPostViewModel } from '../interface/post.interface';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async deleteAllPosts(): Promise<void> {
    await this.postModel.deleteMany({});
  }

  async getPostById(id: string): Promise<IPostViewModel | null> {
    const foundPost = await this.postModel.findOne({ _id: id });
    if (foundPost) {
      return mapPostDBTypeToViewType(foundPost);
    }
    return null;
  }

  async createPost(
    newPost: CreatePostDto & { blogName: string },
  ): Promise<IPostViewModel> {
    const post = new this.postModel({
      _id: uuidv4(),
      title: newPost.title,
      shortDescription: newPost.shortDescription,
      content: newPost.content,
      blogId: newPost.blogId,
      blogName: newPost.blogName,
      createdAt: new Date().toISOString(),
    });

    const createdPost = await post.save();
    return mapPostDBTypeToViewType(createdPost);
  }

  async updatePost(
    id: string,
    updatePostDto: UpdatePostDto & { blogName: string },
  ): Promise<boolean> {
    const result = await this.postModel.updateOne(
      { _id: id },
      {
        title: updatePostDto.title,
        shortDescription: updatePostDto.shortDescription,
        content: updatePostDto.content,
        blogId: updatePostDto.blogId,
        blogName: updatePostDto.blogName,
      },
    );

    return result.matchedCount === 1;
  }

  async deletePost(id: string): Promise<boolean> {
    const result = await this.postModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
