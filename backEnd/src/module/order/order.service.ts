import { ShippingAddress } from './../../entities/shipping_address.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { EntityManager, Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { User } from 'src/entities/users.entity';
import { Cart } from 'src/entities/cart.entity';
import { StatusDelivery } from 'src/common/constants/enum';
import { getOrderDto } from './dto/getOrder.dto';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import * as crypto from 'crypto';
import * as https from 'https';
import { PaymentDto } from './dto/payment.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly entityManager: EntityManager,
    private readonly cartService: CartService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const {
      userId,
      totalPrice,
      shippingFee,
      taxFee,
      shippingAddress,
      isPaid,
      paidAt,
      deliveryAt,
    } = createOrderDto;
    // Tạo một thực thể đơn hàng mới
    const order = new Order();
    order.totalPrice = totalPrice;
    order.shippingFee = shippingFee;
    order.taxFee = taxFee;
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['cart'],
    });
    // Tìm thực thể người dùng theo ID và gán vào đơn hàng
    order.userId = userId;
    order.items = user.cart.items;
    order.user = user;
    order.isPaid = isPaid;
    order.paidAt = paidAt;
    order.isDelivery = StatusDelivery.PENDING;
    order.deliveryAt = deliveryAt;

    // Tạo một thực thể địa chỉ giao hàng mới và gán các thuộc tính từ shippingAddress
    const shippingAddressEntity = new ShippingAddress();
    shippingAddressEntity.receiver = shippingAddress.receiver; // Corrected the property name here
    shippingAddressEntity.phoneNumber = shippingAddress.phoneNumber;
    shippingAddressEntity.street = shippingAddress.street;
    shippingAddressEntity.district = shippingAddress.district;
    shippingAddressEntity.city = shippingAddress.city;
    // Gán địa chỉ giao hàng vào đơn hàng
    order.shippingAddress = shippingAddressEntity;
    // Lưu thực thể đơn hàng và trả về
    await this.cartService.clearCart(user.cart.id);
    return this.orderRepository.save(order);
  }

  async getOrders(params: getOrderDto): Promise<ResponsePaginate<Order>> {
    try {
      const query = this.orderRepository.createQueryBuilder('order');
      query.leftJoinAndSelect('order.user', 'user');
      query.leftJoinAndSelect('order.items', 'items');
      query.leftJoinAndSelect('items.product', 'product');
      query.skip(params.skip).take(params.take);
      const [orders, total] = await query.getManyAndCount();
      const pageMetaDto = new PageMetaDto({
        itemCount: total,
        pageOptionsDto: params,
      });
      return new ResponsePaginate<Order>(
        orders,
        pageMetaDto,
        'Get data of order success',
      );
    } catch (error) {
      throw error;
    }
  }

  async getOrderByID(id: string): Promise<Order> {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await this.orderRepository
          .createQueryBuilder('order')
          .leftJoinAndSelect('order.user', 'user')
          .leftJoinAndSelect('order.shippingAddress', 'shippingAddress')
          .leftJoinAndSelect('order.items', 'items')
          .leftJoinAndSelect('items.product', 'product')
          .where('order.id = :id', { id })
          .getOne();
        resolve(order);
      } catch (error) {
        reject(error);
      }
    });
  }

  async paymentMomo(paymentDto: PaymentDto): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const { amount, redirectUrl } = paymentDto;
      const partnerCode = 'MOMO';
      const accessKey = 'F8BBA842ECF85';
      const secretkey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
      const requestId = 'AKUBA' + new Date().getTime();
      const orderId = requestId;
      const orderInfo = 'Thanh toán MoMo';
      const ipnUrl = 'https://exactly-i7jp.onrender.com/checkout';
      const requestType = 'captureWallet';
      const extraData = '';
      const rawSignature =
        'accessKey=' +
        accessKey +
        '&amount=' +
        amount +
        '&extraData=' +
        extraData +
        '&ipnUrl=' +
        ipnUrl +
        '&orderId=' +
        orderId +
        '&orderInfo=' +
        orderInfo +
        '&partnerCode=' +
        partnerCode +
        '&redirectUrl=' +
        redirectUrl +
        '&requestId=' +
        requestId +
        '&requestType=' +
        requestType;

      const signature = crypto
        .createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex');

      const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: 'en',
      });

      const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody),
        },
      };

      const req = https.request(options, (res) => {
        let payUrl = '';
        res.setEncoding('utf8');
        res.on('data', (body) => {
          payUrl = JSON.parse(body).payUrl;
        });
        res.on('end', () => {
          resolve(payUrl);
        });
      });

      req.on('error', (e) => {
        reject(`problem with request: ${e.message}`);
      });

      // Write data to request body
      req.write(requestBody);
      req.end();
    });
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    let order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    order.isPaid = updateOrderDto.isPaid;
    order.paidAt = updateOrderDto.paidAt;
    order.isDelivery = updateOrderDto.isDelivery;
    order.deliveryAt = updateOrderDto.deliveryAt;

    try {
      await this.entityManager.save(order);
    } catch (error) {
      console.error('Error updating order:', error);
      throw new HttpException('Failed to update order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return order;
  }
}