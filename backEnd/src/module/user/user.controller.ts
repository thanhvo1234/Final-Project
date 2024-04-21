import { CartService } from './../cart/cart.service';
import {
  Controller,
  Post,
  Body,
  Patch,
  ValidationPipe,
  Param,
  Query,
  Get,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ManageUserDto } from './dto/manageUser.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cartService: CartService,
  ) {}

  @Post('register')
  async create(@Body() registerDto: RegisterDto) {
    const result = await this.userService.create(registerDto);
    return { result, message: 'Successfully create new employee' };
  }
  @Get()
  findAll(@Query() params: ManageUserDto) {
    return this.userService.getUsers(params);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Thực hiện xác thực người dùng và nhận cartId
    const { cartId, ...userData } = await this.userService.login(
      loginDto.email,
      loginDto.password,
    );

    // Nếu đăng nhập thành công và nhận được cartId, lấy thông tin giỏ hàng dựa trên cartId
    if (cartId) {
      const cart = await this.cartService.getCartByCartId(cartId);
      // Đảm bảo cart được gán vào userData
      userData.cart = cart;
    }

    return userData;
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    const result = await this.userService.update(id, updateUserDto);
    return { result, message: 'Successfully update employee' };
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      return { message: 'Failed to delete user', error: error.message };
    }
  }
}