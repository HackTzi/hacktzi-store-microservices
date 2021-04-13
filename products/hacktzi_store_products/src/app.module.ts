import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from './department/department.module';
import { ProductModule } from './product/product.module';
import { ReviewsModule } from './reviews/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      subscribers: ['dist/**/*.subscriber{.ts,.js}'],
      synchronize: false,
      //synchronize: process.env.NODE_ENV == 'production'|| false, //TODO: Db schema will be auto created on every application launch. AVOID LATER!!
      retryDelay: 6000,
      retryAttempts: 10,
    }),
    DepartmentModule,
    ProductModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
