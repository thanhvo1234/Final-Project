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
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { RegisterDto } from './dto/register.dto';
  import { UpdateUserDto } from './dto/updateUser.dto';
  import { ManageUserDto } from './dto/manageUser.dto';
  import { LoginDto } from './dto/login.dto';
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
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
    async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
      try {
        const userData = await this.userService.login(
          loginDto.email,
          loginDto.password,
        );
        return { message: 'Login successful', userData };
      } catch (error) {
        throw new HttpException(
          'Login failed. Invalid credentials.',
          HttpStatus.UNAUTHORIZED,
        );
      }
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