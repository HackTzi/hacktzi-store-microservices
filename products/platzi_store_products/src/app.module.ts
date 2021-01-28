import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from './department/department.module';


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
      synchronize: false,
      retryDelay: 6000,
      retryAttempts: 10
    }),
    DepartmentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
