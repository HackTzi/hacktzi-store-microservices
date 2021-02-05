import { ApiProperty } from '@nestjs/swagger';

export class ReactionResDto {
  @ApiProperty()
  totalLikes: number;
}
