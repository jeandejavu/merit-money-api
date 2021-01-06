import { RoleModel } from '@/domain/models/RoleModel';

export interface IAddRoleRepository {
  add: (data: IAddRoleRepository.Params) => Promise<IAddRoleRepository.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IAddRoleRepository {
  export type Params = RoleModel;
  export type Result = boolean;
}
