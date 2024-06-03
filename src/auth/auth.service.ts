import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

import { CreateForgetDto } from './dto/create-forget.dto';
import { CreateResetDto } from './dto/create-reset.dto';

import { UserService } from 'src/user/user.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(user: UserEntity) {
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
    const user = await this.userRepository.findOne({
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
    const email = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!email) throw new UnauthorizedException('E-mail está oncorreto');

    //to do: send e-mail

    return email;
  }

  async reset(data: CreateResetDto) {
    // To do: token validat

    /*const user = await this.userRepository.update(id, {
      data: {
        password: data.password,
      },
    });

    return await this.createToken(user);*/
  }

  async register(data: CreateRegisterDto) {
    /*const user = await this.userRepository.create(data);
    return await this.createToken(user);*/
  }

}
