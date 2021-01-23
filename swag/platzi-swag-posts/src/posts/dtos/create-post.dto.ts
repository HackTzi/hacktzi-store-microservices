import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreatePostImageDto } from './create-post-image.dto';

export class CreatePostDto {
  @ApiPropertyOptional({
    default: '',
  })
  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => CreatePostImageDto)
  @ValidateNested()
  image: CreatePostImageDto;

  @ApiPropertyOptional({
    default: true,
    description: 'Whether or not users can comment in this post',
  })
  @IsOptional()
  @IsBoolean()
  commentsEnabled: boolean;
}
