import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { GoogleCreateDto } from './dto/google-create.dto';
import { GoogleUserEntity } from './entities/google-user.entity';
import { LocalUserEntity } from './entities/local-user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(LocalUserEntity)
    private localRepository: Repository<LocalUserEntity>,
    @InjectRepository(GoogleUserEntity)
    private googleRepository: Repository<GoogleUserEntity>,
    private jwtService: JwtService,
  ) {}
  async signJwt(entity: UserEntity) {
    return await this.jwtService.signAsync({
      id: entity.uuid,
      name: entity.name,
    });
  }
  async validateLocalUser(
    email: string,
    password: string,
  ): Promise<LocalUserEntity> {
    const user = await this.localRepository.findOneBy({
      email: email,
    });
    if (user == null) return null;
    const passwordCorrect = await compare(password, user.password);
    if (!passwordCorrect) {
      return null;
    }
    return user;
  }
  async createLocalUser(schema: UserCreateDto) {
    let localUser = await this.localRepository.findOneBy({
      email: schema.email,
    });
    if (localUser != null) return;
    let user = await this.userService.getUser(schema.name);
    if (user == null) user = await this.userService.createUser(schema.name);
    schema.password = await hash(schema.password, 10);
    localUser = this.localRepository.create({
      email: schema.email,
      password: schema.password,
      attachedUser: user,
    });
    await this.localRepository.save(localUser);
  }
  async createGoogleUser(schema: GoogleCreateDto): Promise<GoogleUserEntity> {
    let user = await this.userService.getUser(schema.name);
    if (user == null) user = await this.userService.createUser(schema.name);
    const googleUser = this.googleRepository.create({
      googleId: schema.id,
      profileName: schema.name,
      attachedUser: user,
    });
    await this.googleRepository.save(googleUser);
    return googleUser;
  }
  async getGoogleUser(id?: string, name?: string): Promise<GoogleUserEntity> {
    return await this.googleRepository.findOne({
      where: [{ googleId: id }, { profileName: name }],
    });
  }
}
