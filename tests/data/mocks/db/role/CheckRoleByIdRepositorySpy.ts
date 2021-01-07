import { ICheckRoleByIdRepository } from '@/data/protocols';

export class CheckRoleByIdRepositorySpy implements ICheckRoleByIdRepository {
  id: string;

  result = true;

  async checkById(id: string): Promise<ICheckRoleByIdRepository.Result> {
    this.id = id;
    return this.result;
  }
}
