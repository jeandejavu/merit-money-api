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
  };
  export type Result = boolean;
}
