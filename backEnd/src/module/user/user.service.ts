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


@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager)
    {
  }
  async create(createUserDto: RegisterDto) {
    const { password, confirmPassword, ...userData } = createUserDto;

    if (password !== confirmPassword) {
        throw new HttpException("Password and Confirm Password do not match", HttpStatus.BAD_REQUEST);
    }
    const user = new User(userData);
    user.password = password;
    user.role = RoleEnum.CUSTOMER;
    await this.entityManager.save(user);
    return { message: "User created successfully", user };
    }

    async login(email: string, password: string) {
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        if (user.password !== password) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const { password: _, ...userData } = user;
        return userData;
    }

    async getUsers(params: ManageUserDto) {
        const users = this.usersRepository
          .createQueryBuilder('user')
        const [result, total] = await users.getManyAndCount();
        const pageMetaDto = new PageMetaDto({
          itemCount: total,
          pageOptionsDto: params,
        });
        return new ResponsePaginate(result, pageMetaDto, 'Users retrieved successfully');
      }

      async getUserById(id: string) {
        const user = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();
        
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
    
        return { message: "User retrieved successfully", user };
    }
    

    async update(id: string, updateUsereDto: UpdateUserDto) {
        const user = await this.usersRepository.findOneBy({ id });
        if (user) {
            user.email = updateUsereDto.email;
            user.fullName = updateUsereDto.fullName;
            user.password = updateUsereDto.password;
            user.phoneNumber = updateUsereDto.phoneNumber;
            user.address = updateUsereDto.address;
            user.role = RoleEnum.CUSTOMER,
          await this.entityManager.save(user);
          return user;
        }
      }

      async remove(id: string) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
        } else {
            await this.usersRepository.softDelete(id);
            return { message: `User with email ${user.email} soft deleted successfully` };
        }
    }
    
}