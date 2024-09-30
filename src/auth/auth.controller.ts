/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Get,
  Req,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name); // Define the logger

  @Post('signup')
  async register(@Body() signupDto: SignupDto) {
    this.logger.log(`Signup attempt with email: ${signupDto.email}`); // Log the incoming request
    await this.authService.register(signupDto);
    return { message: 'User registered successfully' };
  }

  @Post('signin')
  async signin(@Body() loginDto: LoginDto, @Res() res: Response) {
    await this.authService.login(loginDto, res);
    return res.send({ message: 'Login successful' });
  }

  @UseGuards(JwtAuthGuard) // Protect this route
  @Get('me')
  getMe(@Req() req: any) {
    return req.user; // Return the authenticated user's info
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return res.send({ message: 'Logged out successfully' });
  }
}
