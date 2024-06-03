import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class FilesService {

  constructor(
    @InjectRepository(FileEntity)
    private fotoRepository: Repository<FileEntity>,
  ) {}

  async salvarFile(file: Express.Multer.File, req: Request) {
    const photo = new FileEntity();
    photo.fileName = file.filename;
    photo.contentLength = file.size;
    photo.contentType = file.mimetype;
    photo.url = `http://localhost:3000/files/${file.filename}`;

    return await this.fotoRepository.save(photo);
  }

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
