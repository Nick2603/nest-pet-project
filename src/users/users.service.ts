import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { IUserViewModel } from './interface/user.interface';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.getUsers();
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUserViewModel> {
    return this.usersRepository.createUser(createUserDto);
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.usersRepository.deleteUser(id);
  }
}
