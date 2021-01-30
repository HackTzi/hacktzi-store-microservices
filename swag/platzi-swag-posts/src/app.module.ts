import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SwagModule } from './swag/swag.module';

@Module({
  imports: [
    SwagModule,
    MongooseModule.forRoot('mongodb://localhost:27350', {
      auth: {
        user: 'admin',
        password: 'admin',
      },
    }),
  ],
})
export class AppModule {}
