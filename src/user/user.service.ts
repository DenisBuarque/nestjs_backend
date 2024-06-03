import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async create(data: CreateUserDto): Promise<UserEntity> {

    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    return this.userRepository.save(data);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({where: { id }});

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    return user;
  }

  async update(id: number, data: Partial<UserEntity>): Promise<UpdateResult> {
    
    const record = await this.userRepository.exists({where: {id}});
    if(!record) throw new NotFoundException('usuário não encontrado!');

    if(data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }

    data.updatedAt = new Date();

    return await this.userRepository.update(id, data);

  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.userRepository.delete({ id });
  }
}
