import { IController, IHttpResponse } from '@/presentation/protocols';
import { serverError, ok } from '@/presentation/helpers';
import { IListRolesUseCase } from '@/domain/usecases';

export class ListRolesController implements IController {
  constructor(private readonly listRole: IListRolesUseCase) {}

  async handle(): Promise<IHttpResponse> {
    try {
      const data = await this.listRole.list();
      return ok(data);
    } catch (error) {
      return serverError(error);
    }
  }
}
