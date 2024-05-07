import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus,
    Get,
    Query,
    Param,
    Patch,
    ValidationPipe,
  } from '@nestjs/common';
  import { OrderService } from './order.service';
  import { CreateOrderDto } from './dto/createOrder.dto';
  import { Order } from 'src/entities/orders.entity';
  import { getOrderDto } from './dto/getOrder.dto';
  import { PaymentDto } from './dto/payment.dto';
  import { UpdateOrderDto } from './dto/updateOrder.dto';
  
  @Controller('order')
  export class OrderController {
    constructor(private readonly orderService: OrderService) {}
  
    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
      try {
        const order = await this.orderService.createOrder(createOrderDto);
        return order;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Get()
    async findAll(@Query() params: getOrderDto) {
      try {
        const orders = await this.orderService.getOrders(params);
        return { data: orders, message: 'Lấy danh sách sản phẩm thành công' };
      } catch (error) {
        return { error: error.message };
      }
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      try {
        const order = await this.orderService.getOrderByID(id);
        return { order, message: 'order retrieved successfully' };
      } catch (error) {
        return { message: 'Failed to retrieve order', error: error.message };
      }
    }
  
    @Post('/paymentMomo')
    async makeMomoPayment(@Body() paymentDto: PaymentDto) {
      try {
        const payUrl = await this.orderService.paymentMomo(paymentDto);
        return { payUrl };
      } catch (error) {
        throw new HttpException(
          'Failed to make payment',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.orderService.updateOrder(id, updateOrderDto);
      return { data: order, message: 'Order successfully updated.' };
    } catch (error) {
      throw new HttpException(error.response || 'Unknown error occurred', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  }
  