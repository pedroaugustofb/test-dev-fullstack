import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './infra/database/products.repository';

import {
  CreateProductDto,
  CreateProductRepositoryDto,
} from './dtos/create-product.dto';
import { readFileSync } from 'fs';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CategoriesRepository } from '../categories/infra/database/categories.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async getAllProducts() {
    try {
      return await this.productsRepository.find({ relations: ['categories'] });
    } catch (error) {
      throw error;
    }
  }

  async getAllProductsByCategory(category: string) {
    try {
      return this.productsRepository.find({
        relations: ['categories'],
        where: {
          categories: {
            id: category,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: string) {
    try {
      return await this.productsRepository.findOne({
        where: {
          id,
        },
        relations: ['categories'],
      });
    } catch (error) {
      throw error;
    }
  }

  private async getBase64Photo(photo: Express.Multer.File) {
    if (!photo) return null;
    const photoData = await readFileSync(photo.path);
    const base64Photo = await photoData.toString('base64');
    return base64Photo;
  }

  async createProduct(productData: CreateProductDto) {
    try {
      const data = {
        name: productData.name,
        qty: productData.qty,
        price: productData.price,
        photo: null,
        categories: [],
      };
      const withSameName = await this.productsRepository.find({
        where: {
          name: data.name,
        },
      });

      if (withSameName.length > 0)
        data.name = `${data.name} (${withSameName.length})`;

      // pegando as entidades categorias
      const { categories: ids } = productData;

      if (ids && ids.length > 0)
        for (const id of ids) {
          const category = await this.categoriesRepository.findOne({
            id,
          });
          if (category) data.categories = [...data.categories, category];
        }

      return await this.productsRepository.create(data);
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: string) {
    try {
      return await this.productsRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: string, productData: UpdateProductDto) {
    try {
      const product = await this.productsRepository.findOne({
        where: {
          id,
        },
      });

      if (!product) throw new Error('Product not found');

      const data: Partial<CreateProductRepositoryDto> = {
        name: productData.name,
        qty: productData.qty,
        price: productData.price,
      };

      return await this.productsRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  }

  async updateProductPhoto(id: string, photo: Express.Multer.File) {
    try {
      const product = await this.productsRepository.findOne({
        where: {
          id,
        },
      });

      if (!product) throw new Error('Product not found');

      const base64Photo = await this.getBase64Photo(photo);

      return await this.productsRepository.update(id, {
        photo: base64Photo,
      });
    } catch (error) {
      throw error;
    }
  }
}
