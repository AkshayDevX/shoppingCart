import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(signinDto: SigninDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(signinDto.username);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordMatch = await bcrypt.compare(
      signinDto.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, userRole: user.role
     };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
