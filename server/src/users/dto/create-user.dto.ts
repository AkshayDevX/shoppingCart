import { IsString, IsNotEmpty, MinLength, IsEnum, Min } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(['user', 'admin'], {
    message: 'please enter a valid role',
  })
  role: 'user' | 'admin';
}
