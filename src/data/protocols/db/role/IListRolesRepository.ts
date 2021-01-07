import { RoleModel } from '@/domain/models';

export interface IListRolesRepository {
  list: () => Promise<IListRolesRepository.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IListRolesRepository {
  export type Result = RoleModel[];
}
