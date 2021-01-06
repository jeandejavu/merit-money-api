import { IAddRoleUseCase } from '@/domain/usecases';
import {
  IAddRoleRepository,
  ICheckRoleByDescriptionRepository,
  IGenerateID,
} from '@/data/protocols';
import { RoleModel } from '@/domain/models/RoleModel';

export class DbAddRoleUseCase implements IAddRoleUseCase {
  constructor(
    private readonly addRoleRepository: IAddRoleRepository,
    private readonly checkRoleByDescriptionRepository: ICheckRoleByDescriptionRepository,
    private readonly generateID: IGenerateID,
  ) {}

  async add({
    description,
  }: IAddRoleUseCase.Params): Promise<IAddRoleUseCase.Result> {
    const exists = await this.checkRoleByDescriptionRepository.checkByDescription(
      description,
    );
    if (exists) return false;
    const id = await this.generateID.generateID();
    const roleModel = new RoleModel(id, description);
    return this.addRoleRepository.add(roleModel);
  }
}
