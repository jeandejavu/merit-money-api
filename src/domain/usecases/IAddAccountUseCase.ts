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
  };

  export type Result = boolean;
}
