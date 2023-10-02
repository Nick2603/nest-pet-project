import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserViewModel } from './interface/user.interface';
import { UsersQueryRepository } from './repository/users.queryRepository';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private usersQueryRepository: UsersQueryRepository,
  ) {}

  @Get()
  getUsers(
    @Query('searchLoginTerm') searchLoginTerm: string,
    @Query('searchEmailTerm') searchEmailTerm: string,
    @Query('sortBy') sortBy: string,
    @Query('sortDirection') sortDirection: string,
    @Query('pageNumber') pageNumber: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.usersQueryRepository.getUsersPaginated({
      searchLoginTerm,
      searchEmailTerm,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
    });
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
