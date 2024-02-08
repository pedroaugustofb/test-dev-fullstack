import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { CategoryEntity } from '../../categories/infra/database/category.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Ball', required: true })
  name: string;

  @IsNotEmpty()
  @Min(0)
  @IsNumber({ allowNaN: false })
  @IsInt()
  @ApiProperty({ example: 10, required: true })
  qty: number;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  @Min(0.01)
  @ApiProperty({ example: 100, required: true })
  price: number;

  @IsOptional()
  @ApiProperty({ required: false })
  photo: Express.Multer.File;

  @IsString({ each: true })
  @IsOptional()
  categories: string[];
}

export interface CreateProductRepositoryDto {
  name: string;
  qty: number;
  price: number;
  photo: string;
  categories: CategoryEntity[];
}
