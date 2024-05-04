import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Cart } from 'src/entities/cart.entity';
import { Product } from 'src/entities/products.entity';
import { CartItem } from 'src/entities/cart_items.entity';
import { GetCartDto } from './dto/getCart.dto';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { PageMetaDto } from 'src/common/dtos/pageMeta';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly entityManager: EntityManager, // Thêm EntityManager vào đây
  ) {}

  async getCartByCartId(cartId: string): Promise<Cart> {
    return this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.items', 'items')
      .leftJoinAndSelect('cart.user', 'user')
      .leftJoin('items.product', 'product')
      .select([
        'cart',
        'items',
        'user',
        'product.nameProduct',
        'product.price',
        'product.coupon',
        'product.image',
        'product.sku',
        'product.coupon',
      ])
      .orderBy('items.updatedAt', 'DESC')
      .where('cart.id = :id', { id: cartId })
      .getOne();
  }

  async addProductToCart(cartId: string, productId: string): Promise<CartItem> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items'],
    });
    if (!cart) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }
    const existingCartItem = await this.cartItemRepository.findOne({
      where: { product: { id: productId }, cart: { id: cartId } },
    });
    if (existingCartItem) {
      throw new HttpException(
        'Product already exists in the cart',
        HttpStatus.BAD_REQUEST,
      );
    }
    let priceAfterDiscount = product.price;
    if (product.coupon > 0) {
      const discountAmount = (product.price * product.coupon) / 100;
      priceAfterDiscount = product.price - discountAmount;
    }

    const cartItem = new CartItem();
    cartItem.product = product;
    cartItem.quantity = 1;
    cartItem.priceForEach = priceAfterDiscount;
    cartItem.total = priceAfterDiscount * cartItem.quantity;
    cartItem.cart = cart;

    await this.cartItemRepository.save(cartItem);
    cart.totalPrice += cartItem.total;
    await this.cartRepository.save(cart);
    await this.cartItemRepository.save(cartItem);
    return cartItem;
  }

  async increaseProductQuantity(
    cartId: string,
    cartItemId: string,
  ): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
      relations: ['cart'],
    });
    if (!cartItem) {
      throw new HttpException(
        'Product not found in the cart',
        HttpStatus.NOT_FOUND,
      );
    }
    cartItem.quantity += 1;
    cartItem.total = cartItem.priceForEach * cartItem.quantity;
    await this.cartItemRepository.save(cartItem);
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items'],
    });
    cart.totalPrice = cart.items.reduce((total, item) => total + item.total, 0);
    await this.cartRepository.save(cart);
    return cartItem;
  }

  async decreaseProductQuantity(
    cartId: string,
    cartItemId: string,
  ): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
      relations: ['cart'],
    });
    if (!cartItem) {
      throw new HttpException(
        'Product not found in the cart',
        HttpStatus.NOT_FOUND,
      );
    }
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      cartItem.total = cartItem.priceForEach * cartItem.quantity;
      await this.cartItemRepository.save(cartItem);
      const cart = await this.cartRepository.findOne({
        where: { id: cartId },
        relations: ['items'],
      });
      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.total,
        0,
      );
      await this.cartRepository.save(cart);
    }
    return cartItem;
  }

  async removeCartItemFromCart(cartItemId: string): Promise<void> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
      relations: ['cart'],
    });

    if (!cartItem) {
      throw new HttpException('Cart item not found', HttpStatus.NOT_FOUND);
    }

    await this.cartItemRepository.remove(cartItem);
    const cart = await this.cartRepository.findOne({
      where: { id: cartItem.cart.id },
      relations: ['items'],
    });

    if (!cart) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + (item.id === cartItemId ? 0 : item.total),
      0,
    );
    await this.cartRepository.save(cart);
  }

  async getCarts(params: GetCartDto): Promise<ResponsePaginate<Cart>> {
    try {
      const query = this.cartRepository.createQueryBuilder('cart');
      query.leftJoinAndSelect('cart.items', 'items');
      query.leftJoinAndSelect('cart.user', 'user');
      query.skip(params.skip).take(params.take);
      const [carts, total] = await query.getManyAndCount();
      const pageMetaDto = new PageMetaDto({
        itemCount: total,
        pageOptionsDto: params,
      });
      return new ResponsePaginate<Cart>(
        carts,
        pageMetaDto,
        'Brands retrieved successfully',
      );
    } catch (error) {
      throw error;
    }
  }

  async clearCart(cartId: string): Promise<void> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items'],
    });

    if (!cart) {
      throw new Error('Cart not found');
    }
    cart.items = [];
    cart.totalPrice = 0;
    await this.cartRepository.save(cart);
  }
}
