import {
  IController,
  IHttpResponse,
  IValidation,
} from '@/presentation/protocols';
import {
  badRequest,
  serverError,
  unauthorized,
  ok,
} from '@/presentation/helpers';
import { IAuthentication } from '@/domain/usecases';
import { CheckFieldError } from '@/domain/errors';

export class AuthenticationController implements IController {
  constructor(
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation,
  ) {}

  async handle(
    request: AuthenticationController.Request,
  ): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error instanceof Error) {
        return badRequest(error);
      }
      const authenticationModel = await this.authentication.auth(request);
      return ok(authenticationModel);
    } catch (error) {
      if (error instanceof CheckFieldError) return unauthorized();
      return serverError(error);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthenticationController {
  export type Request = {
    email: string;
    password: string;
  };
}
