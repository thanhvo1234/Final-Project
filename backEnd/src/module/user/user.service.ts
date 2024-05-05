import { MailerService } from '@nestjs-modules/mailer';
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/entities/users.entity';
import { RoleEnum } from 'src/common/constants/enum';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { ManageUserDto } from './dto/manageUser.dto';
import { Cart } from 'src/entities/cart.entity';
import { ConfigService } from '@nestjs/config';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

export type SendEMailDto={
  sender?: string | Address;
  recipients: string | Address;
  subject: string;
  text: string;
  html: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly entityManager: EntityManager,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    
  ) {}
  async create(createUserDto: RegisterDto) {
    const { password, email, confirmPassword, ...userData } = createUserDto;
    const existingUser = await this.entityManager.findOne(User, { where: { email } });
    if (existingUser) {
        throw new HttpException(
            'Email is already in use',
            HttpStatus.BAD_REQUEST,
        );
    }
  
    if (password !== confirmPassword) {
      throw new HttpException(
        'Password and Confirm Password do not match',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    // Tạo một người dùng mới và lưu vào cơ sở dữ liệu
    const user = new User(userData);
    user.password = password;
    user.role = RoleEnum.CUSTOMER;
    await this.entityManager.save(user);

    const cart = new Cart();
    cart.user = user;
    await this.entityManager.save(cart);

    user.cartId = cart.id;
    await this.entityManager.save(user);
    await this.sendWelcomeEmail(user.email, user.password);
    const userDataWithoutCart = { ...user, cart: undefined };
    
    return { message: 'User created successfully', user: userDataWithoutCart };
  }
  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    if (user.password !== password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;
    return userData;
  }

  async getUsers(params: ManageUserDto) {
    const users = this.usersRepository.createQueryBuilder('user');
    if (params.searchByName) {
      users.andWhere('user.fullName ILIKE :fullName', {
        fullName: `%${params.searchByName}%`,
      });
    }
    const [result, total] = await users.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: params,
    });
    return new ResponsePaginate(
      result,
      pageMetaDto,
      'Users retrieved successfully',
    );
  }
  private async sendWelcomeEmail(email: string, password: string) {
    const subject = 'Welcome to Our Platform';
    const text = `Dear user,\n\nYour account has been successfully created.\n\nEmail: ${email}\nPassword: ${password}\n\nThank you for joining us!`;
    const html = `<p>Dear user,</p><p>Your account has been successfully created.</p><p>Email: <strong>${email}</strong></p><p>Password: <strong>${password}</strong></p><p>Thank you for joining us!</p>`;
    try {
      await this.mailerService.sendMail({
        to: email,
        subject,
        text,
        html,
      });
      console.log('Email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async getUserById(id: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.cart', 'cart')
      .leftJoinAndSelect('user.orders', 'order')
      .leftJoinAndSelect('order.items', 'item')
      .leftJoinAndSelect('item.product', 'product')
      .getOne();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return { message: 'User retrieved successfully', user };
  }

  async update(id: string, updateUsereDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      user.email = updateUsereDto.email;
      user.fullName = updateUsereDto.fullName;
      user.phoneNumber = updateUsereDto.phoneNumber;
      user.address = updateUsereDto.address;
      await this.entityManager.save(user);
      return user;
    }
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.usersRepository.softDelete(id);
      return {
        message: `User with email ${user.email} soft deleted successfully`,
      };
    }
  }
}