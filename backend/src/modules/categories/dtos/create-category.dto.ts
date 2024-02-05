import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Toys', required: true })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '123456', required: true })
  parentId: string;
}
