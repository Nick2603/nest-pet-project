import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserViewModel } from './interface/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<IUserViewModel> {
    return this.usersService.createUser(createUserDto);
  }

  @Delete(':id')
  async deleteUser(@Res() response: Response, @Param('id') id: string) {
    const result = await this.usersService.deleteUser(id);
    if (result) {
      response.sendStatus(HttpStatus.NO_CONTENT);
      return;
    }

    response.sendStatus(HttpStatus.NOT_FOUND);
  }
}
