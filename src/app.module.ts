import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

const URL = process.env.MONGO_URL;

if (!URL) {
  throw new Error('URL is not found');
}

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(URL)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
