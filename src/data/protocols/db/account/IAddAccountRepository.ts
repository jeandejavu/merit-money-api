import { RoleModel } from '@/domain/models';

export interface IAddAccountRepository {
  add: (
    data: IAddAccountRepository.Params,
  ) => Promise<IAddAccountRepository.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IAddAccountRepository {
  export type Params = {
    name: string;
    email: string;
    password: string;
    account_role: RoleModel;
    avatar: string;
  };
  export type Result = boolean;
}
