import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsBoolean } from 'class-validator';

export class ReactionReqDto {
  @ApiProperty({
    description: 'Reaction type, it should be `like`',
    example: 'like',
  })
  /** Currently we only support this reaction type */
  @Equals('like')
  type: string;

  @ApiProperty({
    description:
      'The new value for the reaction type, it can be `true` or `false`',
  })
  @IsBoolean()
  value: boolean;
}
