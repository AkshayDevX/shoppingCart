import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Check if the token is expiring in less than 10 days
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp - currentTime < 864000) {
        // Reissue token with 20 days expiration
        const newPayload = {
          sub: payload.sub,
          userRole: payload.userRole,
        };
        const newToken = this.jwtService.sign(newPayload, {
          secret: process.env.JWT_SECRET,
          expiresIn: '20d',
        });

        // Set the new token as a cookie
        response.cookie('token', newToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 1728000000),
        });
      }
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const { token } = request.cookies;
    return token;
  }
}
