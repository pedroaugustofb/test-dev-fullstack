import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductRepositoryDto } from '../../dtos/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async find(options?: object): Promise<ProductEntity[]> {
    return await this.repository.find(options);
  }

  async findOne(options: object): Promise<ProductEntity> {
    return await this.repository.findOne(options);
  }

  async create(product: CreateProductRepositoryDto): Promise<ProductEntity> {
    console.log(product);
    return await this.repository.save(product);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async update(
    id: string,
    product: Partial<CreateProductRepositoryDto>,
  ): Promise<void> {
    await this.repository.update(
      {
        id,
      },
      product,
    );
  }
}
