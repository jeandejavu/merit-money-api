import { IListRolesUseCase } from '@/domain/usecases';
import { IListRolesRepository } from '@/data/protocols';

export class DbListRolesUseCase implements IListRolesUseCase {
  constructor(private readonly listRolesRepository: IListRolesRepository) {}

  async list(): Promise<IListRolesUseCase.Result> {
    return this.listRolesRepository.list();
  }
}
