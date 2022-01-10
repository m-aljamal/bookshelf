import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto } from './dto/login.do';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { User } from './entity/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignupDto): Promise<{ token: string }> {
    return this.authService.signup(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard())
  @Get('/me')
  me(@CurrentUser() user: User) {
    return user;
  }
}
