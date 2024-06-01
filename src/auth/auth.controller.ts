import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UploadedFiles,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateForgetDto } from './dto/create-forget.dto';
import { CreateResetDto } from './dto/create-reset.dto';
import { CreateRegisterDto } from './dto/create-register.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';
import { Request } from 'express';
import { join } from 'path';

@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileService: FileService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Req() req, @UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: 'image/jpg'}),
      new MaxFileSizeValidator({maxSize: 1024 * 20}),
    ]
  })) file: Express.Multer.File) {
    const path = join(
      __dirname,
      '..',
      '..',
      'storage',
      'images',
      `photo-${req.user.name}`,
    );

    try {
      this.fileService.uploadFile(file, path);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return { success: true };
  }

  @UseGuards(AuthGuard)
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@Req() req, @UploadedFiles() files: Express.Multer.File[]) {

    try {
      console.log(files);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return { success: true };
  }

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
