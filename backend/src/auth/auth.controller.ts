import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { User } from './decorator/user.decorator';
import { GoogleGuard } from './guards/google-oauth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() entity: UserEntity): Promise<string> {
    return await this.authSvc.signJwt(entity);
  }
  @Post('register')
  async register(@Body() schema: UserCreateDto) {
    await this.authSvc.createLocalUser(schema);
  }
  @UseGuards(GoogleGuard)
  @Post('google')
  async googleLogin(@User() entity: UserEntity, @Res() response: Response) {
    response.redirect('http://localhost:3000/notes');
    return response.send(await this.authSvc.signJwt(entity));
  }
}
