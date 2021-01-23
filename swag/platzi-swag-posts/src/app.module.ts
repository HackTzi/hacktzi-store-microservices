import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    PostsModule,
    MongooseModule.forRoot('mongodb://localhost:27350', {
      auth: {
        user: 'admin',
        password: 'admin',
      },
    }),
  ],
})
export class AppModule {}
