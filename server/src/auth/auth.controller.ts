import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(
    @Body() signInDto: SigninDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.signIn(signInDto);
    const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    response.cookie('token', data.access_token, {
      httpOnly: true,
      expires: expiryDate,
    });
    response
      .status(HttpStatus.OK)
      .json({ succes: true, message: 'Logged in successfully' });
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    response.status(HttpStatus.OK).json({
      success: true,
      message: 'Logged out',
    });
  }
}
