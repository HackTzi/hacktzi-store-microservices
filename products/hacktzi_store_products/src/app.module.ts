import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from './department/department.module';
import { ProductModule } from './product/product.module';
import { ProductSubscriber } from './product/product.subscriber';

/** env */
const { 
  DB_NAME,
  DB_USER, 
  DB_PASSWORD,
  NODE_ENV, 
  DB_PORT, 
  DB_HOST
} = process.env

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: parseInt(DB_PORT),
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      subscribers: [ProductSubscriber],
      synchronize: NODE_ENV == 'production'|| false, //TODO: Db schema will be auto created on every application launch. AVOID LATER!!
      retryDelay: 6000,
      retryAttempts: 10
    }),
    DepartmentModule,
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
