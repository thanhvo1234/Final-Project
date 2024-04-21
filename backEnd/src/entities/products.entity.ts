import { AbstractEntity } from 'src/common/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Brand } from './brands.entity';
import { Category } from './categories.entity';
import { CartItem } from './cart_items.entity';

@Entity()
export class Product extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nameProduct: string;
  @Column()
  sku: string;
  @Column({ type: 'int', default: 0 })
  price: number;
  @Column({ nullable: true })
  description: string;
  @Column()
  image: string;
  @Column({ type: 'int', default: 0 })
  quantity: number;
  @Column({ default: false })
  onSale: boolean;
  @Column()
  brandId: string;
  @ManyToOne(() => Brand, (brand) => brand.products, { eager: true })
  @JoinColumn({ name: 'brandId' })
  brand: Brand;
  @Column()
  categoryId: string;
  @Column({ default: 0 })
  coupon: number;
  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  constructor(product: Partial<Product>) {
    super();
    Object.assign(this, product);
  }
}