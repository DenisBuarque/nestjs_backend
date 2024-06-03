import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const token = authorization.split(' ')[1];
      if (token === undefined)
        throw new UnauthorizedException('Acesso negado!');

      const dataUserToken = this.authService.checkToken(token);

      const user = await this.userService.findOne(dataUserToken.sub);
      request.user = user;

      request.token = dataUserToken;

      return true;
    } catch (error) {
      return false;
    }
  }
}

