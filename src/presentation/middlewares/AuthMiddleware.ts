import { IMiddleware, IHttpResponse } from '@/presentation/protocols';
import { ok, serverError, forbidden } from '@/presentation/helpers';
import { IDecrypter } from '@/data/protocols';
import { AccessDeniedError } from '../errors';

export class AuthMiddleware implements IMiddleware {
  constructor(private readonly decrypter: IDecrypter) {}

  async handle(request: AuthMiddleware.Request): Promise<IHttpResponse> {
    try {
      const { accessToken } = request;
      if (!accessToken) return forbidden(new AccessDeniedError());
      const id = await this.decrypter.decrypt(accessToken);

      if (!id) return forbidden(new AccessDeniedError());

      return ok({ account_id: id });
    } catch (error) {
      return serverError(error);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string;
  };
}
