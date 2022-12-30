import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: createUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (userFound) {
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: { id },
    });

    if (!userFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    return userFound;
  }

  async deleteUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: { id },
    });

    if (!userFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);

    return this.userRepository.delete({ id });
  }

  async updateUser(id: number, user: updateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: { id },
    });

    if (!userFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);

    const updateUser = Object.assign(userFound, user);
    return this.userRepository.save(updateUser);
  }
}
