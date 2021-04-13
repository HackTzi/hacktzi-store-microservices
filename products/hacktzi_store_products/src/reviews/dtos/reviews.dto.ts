import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class ProductReviewTdo {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(5)
  score: number;

  @ApiProperty()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsNumber()
  product_id: number;
}

export class UpdateProductReviewTdo {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  score?: number;
}
