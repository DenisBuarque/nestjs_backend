import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { FileModule } from 'src/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports:[
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([UserEntity]),
    FileModule,
    JwtModule.register({
      global: true,
      secret: String(process.env.JWT_SECRET),
      //signOptions: { expiresIn: '2 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
