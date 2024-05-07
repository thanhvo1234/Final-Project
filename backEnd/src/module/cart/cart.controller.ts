import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Query,
  } from '@nestjs/common';
  import { CartService } from './cart.service';
  import { AddToCartDto } from './dto/addToCart.dto';
  import { GetCartDto } from './dto/getCart.dto';
  
  @Controller('cart')
  export class CartController {
    constructor(private readonly cartService: CartService) {}
  
    @Get()
    async findAll(@Query() params: GetCartDto) {
      try {
        const carts = await this.cartService.getCarts(params);
        return { carts, message: 'Brands retrieved successfully' };
      } catch (error) {
        return { message: 'Failed to retrieve carts', error: error.message };
      }
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
      try {
        const cart = await this.cartService.getCartByCartId(id);
        return { data: cart, message: 'Lấy thông tin sản phẩm thành công' };
      } catch (error) {
        return { error: error.message };
      }
    }
    @Post(':id/add')
async addToCart(@Param('id') cartId: string, @Body() addToCartDto: AddToCartDto) {
    try {
        const { productId } = addToCartDto;
        const cartItem = await this.cartService.addProductToCart(cartId, productId);
        return { data: cartItem, message: 'Product successfully added to cart.' };
    } catch (error) {
        throw new HttpException(error.response || 'An unknown error occurred', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

  
    @Post(':cartId/increase/:productId')
    async increaseProductQuantity(
      @Param('cartId') cartId: string,
      @Param('productId') productId: string,
    ) {
      try {
        const cartItem = await this.cartService.increaseProductQuantity(
          cartId,
          productId,
        );
        return {
          data: cartItem,
          message: 'Product quantity increased successfully',
        };
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Post(':cartId/decrease/:productId')
    async decreaseProductQuantity(
      @Param('cartId') cartId: string,
      @Param('productId') productId: string,
    ) {
      try {
        const cartItem = await this.cartService.decreaseProductQuantity(
          cartId,
          productId,
        );
        return {
          data: cartItem,
          message: 'Product quantity decreased successfully',
        };
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
    @Delete(':cartItemId/remove')
    async removeCartItemFromCart(@Param('cartItemId') cartItemId: string) {
      try {
        await this.cartService.removeCartItemFromCart(cartItemId);
        return { message: 'Cart item removed successfully' };
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }