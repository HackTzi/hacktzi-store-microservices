import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateSwagDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Whether or not users can comment in this swag',
  })
  @IsOptional()
  @IsBoolean()
  commentsEnabled: boolean;
}
