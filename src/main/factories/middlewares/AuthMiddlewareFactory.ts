import { IMiddleware } from '@/presentation/protocols';
import { AuthMiddleware } from '@/presentation/middlewares';
import { JwtAdapter } from '@/infra/cryptography';
import env from '@/main/config/env';

export const makeAuthMiddleware = (): IMiddleware => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  return new AuthMiddleware(jwtAdapter);
};
