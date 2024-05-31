import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDto) {

    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    return await this.prismaService.user.create({ data });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    await this.findOne(id);

    if(data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }

    data.updatedAt = new Date();

    return await this.prismaService.user.update({
      data,
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prismaService.user.delete({ where: { id } });
  }
}
