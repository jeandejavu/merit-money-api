import {
  IController,
  IHttpResponse,
  IValidation,
} from '@/presentation/protocols';
import {
  badRequest,
  serverError,
  noContent,
  forbidden,
} from '@/presentation/helpers';
import { CheckFieldError } from '@/presentation/errors';
import { IAddAccountUseCase } from '@/domain/usecases';
import { RoleModel } from '@/domain/models';

export class SignUpController implements IController {
  constructor(
    private readonly addAccount: IAddAccountUseCase,
    private readonly validation: IValidation,
  ) {}

  async handle(request: SignUpController.Request): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error instanceof Error) {
        return badRequest(error);
      }
      const { name, email, password, account_role_id, avatar } = request;
      const isValid = await this.addAccount.add({
        name,
        email,
        password,
        account_role: {
          id: account_role_id,
        } as RoleModel,
        avatar,
      });
      if (!isValid) {
        return forbidden(new Error('Error add account'));
      }
      return noContent();
    } catch (error) {
      if (error instanceof CheckFieldError) return forbidden(error);
      return serverError(error);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SignUpController {
  export type Request = {
    avatar: { filename: string };
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    account_role_id: string;
  };
}
