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
import { FieldAlreadyExistsError } from '@/presentation/errors';
import { IAddRoleUseCase } from '@/domain/usecases';

export class AddRoleController implements IController {
  constructor(
    private readonly addRole: IAddRoleUseCase,
    private readonly validation: IValidation,
  ) {}

  async handle(request: AddRoleController.Request): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error instanceof Error) {
        return badRequest(error);
      }
      const { description } = request;
      const isValid = await this.addRole.add({
        description,
      });
      if (!isValid) {
        return forbidden(new FieldAlreadyExistsError('description'));
      }
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AddRoleController {
  export type Request = {
    description: string;
  };
}
