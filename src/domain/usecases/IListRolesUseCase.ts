import { RoleModel } from '@/domain/models/RoleModel';

export interface IListRolesUseCase {
  list: () => Promise<IListRolesUseCase.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IListRolesUseCase {
  export type Result = RoleModel[];
}
