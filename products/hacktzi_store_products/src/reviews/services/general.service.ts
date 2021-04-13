import { PG_FOREIGN_KEY_VIOLATION } from '@drdgvhbh/postgres-error-codes';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductReviewTdo } from '../dtos/reviews.dto';
import { ProductGeneralReview } from '../entities/reviews.general.entity';
/**
 * Set max update time to __
 * Set allow lokup public true
 */
const MAX_UPDATE_TIME = 1; //in days
// const ALLOW_LOOKUP_REVIEWS = {
//   //TODO allow lookup revw
//   public: true,
// };

@Injectable()
export class GeneralReviewService {
  constructor(
    @InjectRepository(ProductGeneralReview)
    private generalReviewRepo: Repository<ProductGeneralReview>,
  ) {}

  async saveGeneralReview(reviwe: ProductReviewTdo): Promise<any> {
    try {
      const newReview = this.generalReviewRepo.create(reviwe);
      const review = await this.generalReviewRepo.save(newReview);
      return review;
    } catch (err) {
      switch (err.code) {
        case PG_FOREIGN_KEY_VIOLATION: // TODO change custom message and code error for constrains
          throw new NotFoundException('Product not found');
        default:
          throw new InternalServerErrorException(err);
      }
    }
  }

  async findAll(): Promise<any> {
    return this.generalReviewRepo
      .createQueryBuilder('product_general_review')
      .innerJoinAndSelect('product_general_review.product', 'product')
      .innerJoinAndSelect('product.pictures', 'pictures')
      .getMany();
    // temporal fix strategic rels names
    //({relations: ['product']}).selec()
  }

  async findByProductId(id: any): Promise<any> {
    const query = this.generalReviewRepo
      .createQueryBuilder('product_general_review')
      .where('product_general_review.product.id = :id', { id });
    const reviews = await query.getMany();
    const { average } = await query
      .select('AVG(product_general_review.score)', 'average')
      .getRawOne();

    return {
      general_review: {
        average,
      },
      reviews,
    };
  }

  async findByUserId(id: any): Promise<any> {
    const query = this.generalReviewRepo
      .createQueryBuilder('product_general_review')
      .where('product_general_review.user_id = :id', { id })
      .innerJoinAndSelect('product_general_review.product', 'product');
    const reviews = await query.getMany();

    return {
      reviews,
    };
  }

  async getGeneralAvgReview(id: any): Promise<number> {
    const query = this.generalReviewRepo
      .createQueryBuilder('product_general_review')
      .where('product_general_review.product.id = :id', { id });
    const { average } = await query
      .select('AVG(product_general_review.score)', 'average')
      .getRawOne();
    return average;
  }

  async updateGeneralReviews(id: number, updateReview: any) {
    const review = await this.generalReviewRepo.findOne({ id });
    console.log(`time in days ${this.diffDays(review.created)}`);

    if (this.diffDays(review.created) >= MAX_UPDATE_TIME)
      throw new UnauthorizedException(
        `Max Update Time ${MAX_UPDATE_TIME} Day(s) Expired`,
      );
    const editedReview = Object.assign(review, updateReview);

    return this.generalReviewRepo.save(editedReview);
  }

  diffDays(createdDate): number {
    const timeNow: number = new Date().getTime();
    const created: number = new Date(createdDate).getTime();
    const diffTime: number = timeNow - createdDate;
    const f: number = diffTime / (1000 * 3600 * 24);
    return Math.round(f);
  }
}
