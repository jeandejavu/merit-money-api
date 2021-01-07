import { RoleModel } from '../models';

export interface IAddAccountUseCase {
  add: (
    account: IAddAccountUseCase.Params,
  ) => Promise<IAddAccountUseCase.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IAddAccountUseCase {
  export type Params = {
    name: string;
    email: string;
    password: string;
    account_role: RoleModel;
  };

  export type Result = boolean;
}
