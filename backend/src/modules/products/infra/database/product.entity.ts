import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../../../categories/infra/database/category.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  qty: number;

  @Column({ type: 'float', nullable: true })
  price: number;

  @Column({ nullable: true })
  photo: string;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];

  @CreateDateColumn({ name: 'created_at', nullable: false, type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: false, type: 'timestamp' })
  updatedAt: string;
}
