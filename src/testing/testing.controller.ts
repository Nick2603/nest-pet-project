import { Controller, Delete } from '@nestjs/common';
import { UsersRepository } from 'src/users/repository/users.repository';

@Controller('testing')
export class TestingController {
  constructor(private usersRepository: UsersRepository) {}

  @Delete('all-data')
  deleteAllData() {
    this.usersRepository.deleteAllUsers();
    return;
  }
}
