import {
  BadRequestException,
  Headers,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateForgetDto } from './dto/create-forget.dto';
import { CreateResetDto } from './dto/create-reset.dto';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly pirsmaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    return {
      token: this.jwtService.sign(
        {
          sub: user.id,
          name: user.name,
          email: user.email,
        },
        {
          audience: 'user',
          issuer: 'login',
          expiresIn: '2 days',
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: 'user',
        issuer: 'login',
      });

      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(data: CreateAuthDto) {
    const user = await this.pirsmaService.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) throw new UnauthorizedException('Login inválido!');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Senha inválido!');

    return await this.createToken(user);
  }

  async forget(data: CreateForgetDto) {
    const email = await this.pirsmaService.user.findUnique({
      where: { email: data.email },
    });

    if (!email) throw new UnauthorizedException('E-mail está oncorreto');

    //to do: send e-mail

    return email;
  }

  async reset(data: CreateResetDto) {
    // To do: token validat

    const user = await this.pirsmaService.user.update({
      where: {
        id: 1,
      },
      data: {
        password: data.password,
      },
    });

    return await this.createToken(user);
  }

  async register(data: CreateRegisterDto) {
    const user = await this.userService.create(data);
    return await this.createToken(user);
  }
}
