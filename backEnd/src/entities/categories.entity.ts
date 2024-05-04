import { AbstractEntity } from 'src/common/entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class Category extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameCategory: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column()
  skuCategory: string;

  @OneToMany(() => Product, (products) => products.category, {
    cascade: true,
  })
  products: Product[];

  constructor(category: Partial<Category>) {
    super();
    Object.assign(this, category);
  }
}