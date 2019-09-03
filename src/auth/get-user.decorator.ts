import { createParamDecorator } from '@nestjs/common';
import { Auth } from './auth.entity';

export const GetUser = createParamDecorator(
  (data, req): Auth => {
    return req.user;
  },
);
