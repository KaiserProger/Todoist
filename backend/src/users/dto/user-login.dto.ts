import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserLoginDto {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  password: string;
}
