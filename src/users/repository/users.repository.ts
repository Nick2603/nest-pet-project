import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { IUserViewModel } from '../interface/user.interface';
import { mapUserDBTypeToViewType } from 'src/mappers/mapUserDBTypeToViewType';
import { HashService } from 'src/common/HashService';

@Injectable()
export class UsersRepository {
  constructor(
    private hashService: HashService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async deleteAllUsers(): Promise<void> {
    await this.userModel.deleteMany({});
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUserViewModel> {
    const password = createUserDto.password;
    const hashedPassword = await this.hashService.getHashedPassword(password);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });
    const savedUser = await user.save();
    return mapUserDBTypeToViewType(savedUser);
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
