import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { cellphone: createUserDto.cellphone }
    });

    if (existingUser) {
      throw new BadRequestException('A user with this cellphone already exists');
    }

    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }
}
