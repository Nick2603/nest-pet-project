import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../schema/blog.schema';
import { Model } from 'mongoose';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';
import { mapBlogDBTypeToViewType } from '../../mappers/mapBlogDBTypeToViewType';
import { IBlogViewModel } from '../interface/blog.interface';

@Injectable()
export class BlogsRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async deleteAllBlogs(): Promise<void> {
    await this.blogModel.deleteMany({});
  }

  async getBlogById(id: string): Promise<IBlogViewModel | null> {
    const foundBlog = await this.blogModel.findOne({ _id: id });
    if (foundBlog) {
      return mapBlogDBTypeToViewType(foundBlog);
    }
    return null;
  }

  async createBlog(newBlog: CreateBlogDto): Promise<IBlogViewModel> {
    const blog = new this.blogModel({
      _id: uuidv4(),
      name: newBlog.name,
      description: newBlog.description,
      websiteUrl: newBlog.websiteUrl,
      isMembership: false,
      createdAt: new Date().toISOString(),
    });

    const createdBlog = await blog.save();
    return mapBlogDBTypeToViewType(createdBlog);
  }

  async updateBlog(id: string, updateBlogDto: UpdateBlogDto): Promise<boolean> {
    const result = await this.blogModel.updateOne(
      { _id: id },
      {
        name: updateBlogDto.name,
        description: updateBlogDto.description,
        websiteUrl: updateBlogDto.websiteUrl,
      },
    );

    return result.matchedCount === 1;
  }

  async deleteBlog(id: string): Promise<boolean> {
    const result = await this.blogModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
