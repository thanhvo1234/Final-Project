import { AbstractEntity } from 'src/common/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class Brand extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameBrand: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Product, (product) => product.brand, {
    cascade: true,
  })
  product: Product;

  constructor(brand: Partial<Brand>) {
    super();
    Object.assign(this, brand);
  }
}