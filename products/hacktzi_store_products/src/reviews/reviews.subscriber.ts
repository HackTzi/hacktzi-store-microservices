import { Injectable } from '@nestjs/common';
import { Product } from 'src/product/entities/product.entity';
import { EventSubscriber, InsertEvent } from 'typeorm';
import { EntitySubscriberInterface } from 'typeorm/subscriber/EntitySubscriberInterface';
import { ProductGeneralReview } from './entities/reviews.general.entity';

@Injectable()
@EventSubscriber()
export class ReviewsSubscriber
  implements EntitySubscriberInterface<ProductGeneralReview> {
  listenTo = () => ProductGeneralReview;

  async updateAvgReview(event) {
    console.log('Updating general avg');

    const id = event.entity.product_id;

    const productRepository = event.manager.getRepository(Product);
    const ReviewRepository = event.manager.getRepository(ProductGeneralReview);

    const query = ReviewRepository.createQueryBuilder(
      'product_general_review',
    ).where('product_general_review.product.id = :id', { id });
    const count = await query.getCount();

    const { average } = await query
      .select('ROUND(AVG(product_general_review.score)::numeric, 1)', 'average')
      .getRawOne();
    console.log(average);

    const product = await productRepository.findOne({
      id: event.entity.product_id,
    });
    product.reviews.general_avg = average;
    product.reviews.total_general_reviews = count;
    await productRepository.save(product);
  }

  async afterInsert(event: InsertEvent<ProductGeneralReview>) {
    // TODO: Refactor. manage in worker
    await this.updateAvgReview(event);
  }

  async afterUpdate(event: InsertEvent<ProductGeneralReview>) {
    await this.updateAvgReview(event);
  }
}
