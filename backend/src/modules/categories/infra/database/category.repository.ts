import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}

  async find(): Promise<CategoryEntity[]> {
    return await this.repository.find();
  }

  async findOne(options: object): Promise<CategoryEntity> {
    return await this.repository.findOne({ where: options });
  }

  async create(category: {
    name: string;
    parent: CategoryEntity | null;
  }): Promise<CategoryEntity> {
    return await this.repository.save(category);
  }
}
