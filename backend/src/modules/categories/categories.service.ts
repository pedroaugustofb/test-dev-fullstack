import { Injectable, Logger } from '@nestjs/common';
import { CategoriesRepository } from './infra/database/categories.repository';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoriesService {
  private logger = new Logger();

  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getCategories() {
    try {
      return await this.categoriesRepository.find({ relations: ['parent'] });
    } catch (error) {
      throw error;
    }
  }

  async createCategory(category: CreateCategoryDto) {
    try {
      const categoryExists = await this.categoriesRepository.findOne({
        name: category.name,
      });

      if (categoryExists) throw new Error('Category already exists');

      const parent = category.parentId
        ? await this.categoriesRepository.findOne({
            id: category.parentId,
          })
        : null;

      const newCategory = {
        name: category.name,
        parent,
      };
      return await this.categoriesRepository.create(newCategory);
    } catch (error) {
      throw error;
    }
  }
}
