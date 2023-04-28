import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRefreshTokenPayload } from 'src/auth/interfaces';

export const GetCurrentUser = createParamDecorator(
  (data: keyof IRefreshTokenPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
