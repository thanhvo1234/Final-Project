import { AbstractEntity } from 'src/common/entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Brand } from './brands.entity';
import { Category } from './categories.entity';

@Entity()
export class Product extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameProduct: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  amount: number;

  @Column({ nullable: true })
  onSale: boolean;

  @OneToMany(() => Brand, (brand) => brand.product)
  brand: Brand[];

  @OneToMany(() => Category, (category) => category.product)
  category: Category[];

  constructor(product: Partial<Product>) {
    super();
    Object.assign(this, product);
  }
}