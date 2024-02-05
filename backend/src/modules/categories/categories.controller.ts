import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('category')
@ApiTags('category')
export class CategoriesController {
  private logger = new Logger();

  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'List all categories.' })
  @ApiResponse({ status: 200, description: 'Categories found.' })
  @ApiResponse({ status: 404, description: 'Bad Request' })
  async getCategories(@Res() response) {
    this.logger.log('retrieving all categories');

    const categories = await this.categoriesService.getCategories();

    return response.status(HttpStatus.OK).json({
      status: 200,
      message: 'Categories found',
      categories,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category.' })
  @ApiResponse({ status: 201, description: 'Category created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createCategory(@Res() response, @Body() category: CreateCategoryDto) {
    // log the request
    this.logger.log(`creating category > category name: ${category.name}`);

    // create the category
    const createdCategory = await this.categoriesService.createCategory(
      category,
    );

    return response.status(HttpStatus.CREATED).json({
      status: 201,
      message: 'Category has been created successfully',
      createdCategory,
    });
  }
}
