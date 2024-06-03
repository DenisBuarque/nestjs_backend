import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { writeFile } from 'fs/promises';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private fotoRepository: Repository<FileEntity>,
  ) {}

  async salvarFile(file: Express.Multer.File, req: Request) {
    try {
      const photo = new FileEntity();
      photo.fileName = file.filename;
      photo.contentLength = file.size;
      photo.url = `http://localhost:3000/stotage/images/${file.filename}`;

      return await this.fotoRepository.save(photo);
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao enviar sua imagem!');
    }
  }

  async salvarVariosDados(files: Express.Multer.File[], req: Request) {
    const arrayArquivos = files.map((file) => {
      const photo = new FileEntity();
      photo.fileName = file.filename;
      photo.contentLength = file.size;
      photo.url = `http://localhost:3000/stotage/images/photos/${
        file.filename
      }`;
      return photo;
    });

    return await this.fotoRepository.save(arrayArquivos);
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
