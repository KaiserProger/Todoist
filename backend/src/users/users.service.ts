import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(name: string): Promise<UserEntity> {
    const entity = this.userRepository.create({ name: name });
    await this.userRepository.save(entity);
    return entity;
  }
  async getUser(name: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({
      name: name,
    });
  }
  async getUserById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({
      uuid: id,
    });
  }
}
