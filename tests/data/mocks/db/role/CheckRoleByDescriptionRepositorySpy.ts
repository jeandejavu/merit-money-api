import { ICheckRoleByDescriptionRepository } from '@/data/protocols';

export class CheckRoleByDescriptionRepositorySpy
  implements ICheckRoleByDescriptionRepository {
  description: string;

  result = false;

  async checkByDescription(
    description: string,
  ): Promise<ICheckRoleByDescriptionRepository.Result> {
    this.description = description;
    return this.result;
  }
}
