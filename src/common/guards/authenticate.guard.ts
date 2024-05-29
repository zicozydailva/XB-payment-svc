import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestHeadersEnum } from 'src/enums/base.enum';
import { ErrorHelper } from 'src/helpers/error.utils';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const req = context.switchToHttp().getRequest();
      const authorization =
        req.headers[RequestHeadersEnum.Authorization] ||
        String(req.cookies.accessToken);

      const user = await this.verifyAccessToken(authorization);
      req.user = user;
      return true;
    } catch (error) {
      throw error;
    }
  }

  private async verifyAccessToken(authorization: string) {
    try {
      const [bearer, accessToken] = authorization.split(' ');
      if (bearer == 'Bearer' && accessToken != '') {
        const user = await this.authService.verifyToken(accessToken);

        if (!user) {
          ErrorHelper.UnauthorizedException('Unauthorized Exception');
        }

        return user;
      } else {
        ErrorHelper.UnauthorizedException('Unauthorized');
      }
    } catch (error) {
      ErrorHelper.UnauthorizedException('Unauthorized');
    }
  }
}
