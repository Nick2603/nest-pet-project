import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema/user.schema';
import { UsersRepository } from '../users/repository/users.repository';
import { TestingController } from './testing.controller';
import { HashService } from 'src/common/HashService';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [TestingController],
  providers: [UsersRepository, HashService],
})
export class TestingModule {}
