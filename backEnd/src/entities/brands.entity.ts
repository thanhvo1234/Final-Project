import { AbstractEntity } from 'src/common/entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './products.entity';
@Entity()
export class Brand extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nameBrand: string;

  @Column()
  skuBrand: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @OneToMany(() => Product, (products) => products.brand, {
    cascade: true,
  })
  products: Product[];

  constructor(brand: Partial<Brand>) {
    super();
    Object.assign(this, brand);
  }
}