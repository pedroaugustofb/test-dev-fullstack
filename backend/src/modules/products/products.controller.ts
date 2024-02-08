import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dtos/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  private logger = new Logger();

  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'The list of all products.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async findAll(@Res() response) {
    this.logger.log('getting all products');

    const products = await this.productsService.getAllProducts();

    return response.status(HttpStatus.OK).json({
      status: 200,
      message: 'The list of all products.',
      products,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Res() response, @Body() body: CreateProductDto) {
    this.logger.log('creating new product');

    console.log(body);
    const product = await this.productsService.createProduct(body);

    return response.status(HttpStatus.CREATED).json({
      status: 201,
      message: 'The product has been successfully created.',
      product,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async delete(@Res() response, @Param('id') id: string) {
    this.logger.log('deleting product');

    const product = await this.productsService.deleteProduct(id);

    return response.status(HttpStatus.OK).json({
      status: 200,
      message: 'The product has been successfully deleted.',
      product,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ) {
    this.logger.log(`updating product > ${id}`);

    const product = await this.productsService.updateProduct(id, body);

    return response.status(HttpStatus.OK).json({
      status: 200,
      message: 'The product has been successfully updated.',
      product,
    });
  }

  @Patch('photo/:id')
  @ApiOperation({ summary: 'Update a photo product' })
  @ApiResponse({
    status: 200,
    description: 'The photo has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @UseInterceptors(FileInterceptor('photo'))
  async updatePhoto(
    @Res() response,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.logger.log(`updating photo product > ${id}`);

    const product = await this.productsService.updateProductPhoto(id, file);

    return response.status(HttpStatus.OK).json({
      status: 200,
      message: 'The photo has been successfully updated.',
      product,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully found.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async findOne(@Res() response, @Param('id') id: string) {
    this.logger.log(`getting product > ${id}`);

    const product = await this.productsService.getProductById(id);

    return response.status(HttpStatus.OK).json({
      status: 200,
      message: 'The product has been successfully found.',
      product,
    });
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get all products for category' })
  @ApiResponse({
    status: 200,
    description: 'The list of all products.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async findAllByCategory(
    @Param('category') category: string,
    @Res() response,
  ) {
    this.logger.log(`getting produts for category > ${category}`);

    const products = await this.productsService.getAllProductsByCategory(
      category,
    );

    return response.status(HttpStatus.OK).json({
      status: 200,
      message: 'The list of all products.',
      products,
    });
  }
}
