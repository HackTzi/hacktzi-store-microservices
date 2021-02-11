import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from './department/department.module';
import { ProductModule } from './product/product.module';
import { ProductSubscriber } from './product/product.subscriber';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'platzi-store-products-user-db',
      password: 'platzi-store-products-user-pw',
      database: 'platzi-store-products-db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      subscribers: [ProductSubscriber],
      synchronize: false,
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
