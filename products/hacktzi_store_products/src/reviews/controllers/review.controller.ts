import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductReviewTdo, UpdateProductReviewTdo } from '../dtos/reviews.dto';
import { GeneralReviewService } from '../services/general.service';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private generalReviewService: GeneralReviewService) {}
  /**
   * NOTE!!
   * this controller must be handle by payments & orders service
   */
  @Post()
  saveReview(@Body() review: ProductReviewTdo) {
    return this.generalReviewService.saveGeneralReview(review);
  }

  @Put('/:id')
  updateReview(
    @Body() updateReview: UpdateProductReviewTdo,
    @Param('id') id: number,
  ) {
    return this.generalReviewService.updateGeneralReviews(id, updateReview);
  }

  @Get()
  getIndividualReview() {
    return this.generalReviewService.findAll();
  }

  @Get('/:id')
  getReviewByProduct(@Param('id') id: string) {
    //synchronized reviews per query
    return this.generalReviewService.findByProductId(id);
  }

  @Get('user/:id')
  getReviewByUser(@Param('id') id: string) {
    //TODO: Allow only publics reviews
    return this.generalReviewService.findByUserId(id);
  }

  // @Get('/questions')
  // getQuestionsReviews(){ //TODO IMPLEMEnt
  //     return new Error('No implemented')
  // }
}
