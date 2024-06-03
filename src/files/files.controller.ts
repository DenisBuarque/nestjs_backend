import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  UploadedFiles,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';
import { join } from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('photo')
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    return await this.filesService.salvarFile(file, req);
  }

  @Post('photos')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photos' }], multerConfig))
  uploadVariosArquivos(
    @UploadedFiles()
    files: Express.Multer.File[],
    @Req() req,
  ) {
    return this.filesService.salvarVariosDados(files['photos'], req);
  }

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
