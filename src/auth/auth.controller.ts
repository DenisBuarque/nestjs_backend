import {
  Controller,
  Post,
  Body,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateForgetDto } from './dto/create-forget.dto';
import { CreateResetDto } from './dto/create-reset.dto';
import { CreateRegisterDto } from './dto/create-register.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('login')
  async login(@Body() data: CreateAuthDto) {
    return this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data: CreateRegisterDto) {
    return await this.authService.register(data);
  }

  @Post('forget')
  async forget(@Body() data: CreateForgetDto) {
    return await this.authService.forget(data);
  }

  @Post('reset')
  async reset(@Body() data: CreateResetDto) {
    return await this.authService.reset(data);
  }
}
