import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenPayload } from 'src/auth/interfaces';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as ITokenPayload;
    return user.sub;
  },
);
