import { ApiError } from '../exceptions/api-errors';
import { TokenService } from '../../core/token/token.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(TokenService) private _tokenService: TokenService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();

      const authorizationHeader = request.headers.authorization;
      if (!authorizationHeader) {
        throw ApiError.UnauthorizedError();
      }

      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) {
        throw ApiError.UnauthorizedError();
      }

      const userData = this._tokenService.validateAccessToken(accessToken);
      if (!userData) {
        throw ApiError.UnauthorizedError();
      }
      return true;
    } catch (error) {
      throw ApiError.UnauthorizedError();
    }
  }
}
