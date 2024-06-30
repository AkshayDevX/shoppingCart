import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SigninDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.signIn(signInDto);
    const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    response.cookie('token', data.access_token, {
      httpOnly: false,
      expires: expiryDate,
      path: "/"
    });

    return {
      success: true,
      message: 'Logged in',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: false,
      path: "/"
    });

    return {
      success: true,
      message: 'Logged out',
    };
  }
}
