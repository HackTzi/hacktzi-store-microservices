import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductIndividualReview } from '../entities/reviews.questions.entity';

/**
 * Set max update time to __
 * Set allow lokup public true
 */
//const MAX_UPDATE_TIME = 5.256e9;
// const ALLOW_LOOKUP_REVIEWS = {
//   //TODO allow lookup revw
//   public: true,
// };

@Injectable()
export class IndividualReviewsService {
  constructor(
    @InjectRepository(ProductIndividualReview)
    private individualReview: Repository<ProductIndividualReview>,
  ) {}

  saveIndividualReview() {
    return 'saved';
  }

  updateInvidualReview() {
    return 'no implemented';
  }
}
