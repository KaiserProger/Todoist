import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { isNotEmpty } from 'class-validator';
import { Profile, Strategy } from 'passport-google-oauth20';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { GoogleCreateDto } from '../dto/google-create.dto';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: '/auth/google',
      scope: ['profile'],
      state: true,
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<UserEntity> {
    const schema: GoogleCreateDto = {
      id: profile.id,
      name: profile.displayName,
    };
    let googleUser = await this.authService.getGoogleUser(schema.id);
    if (isNotEmpty(googleUser)) {
      if (!isNotEmpty(await this.userService.getUserById(profile.id)))
        throw new UnauthorizedException();
      return googleUser.attachedUser;
    }
    googleUser = await this.authService.createGoogleUser(schema);
    return googleUser.attachedUser;
  }
}
