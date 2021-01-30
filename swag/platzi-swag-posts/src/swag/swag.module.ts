import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SwagController } from './swag.controller';
import { SwagService } from './swag.service';
import { Swag, PostSchema } from './schemas/swag.schema';
import { HashtagProvider } from './providers/hashtag.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Swag.name,
        schema: PostSchema,
      },
    ]),
  ],
  providers: [SwagService, HashtagProvider],
  controllers: [SwagController],
})
export class SwagModule {}
