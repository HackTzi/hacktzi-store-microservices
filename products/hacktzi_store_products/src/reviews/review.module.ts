import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductIndividualReview } from './entities/reviews.questions.entity';
import { ProductGeneralReview } from './entities/reviews.general.entity';
import { IndividualReviewsService } from './services/individual.service';
import { GeneralReviewService } from './services/general.service';
import { ReviewsController } from './controllers/review.controller';
import { ProductService } from 'src/product/services/product.service';
import { Product } from 'src/product/entities/product.entity';
import { ReviewsSubscriber } from './reviews.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductIndividualReview,
      ProductGeneralReview,
      Product,
    ]),
  ],
  providers: [
    IndividualReviewsService,
    GeneralReviewService,
    ProductService,
    ReviewsSubscriber,
  ],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
