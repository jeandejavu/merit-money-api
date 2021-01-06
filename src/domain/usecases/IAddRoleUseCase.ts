export interface IAddRoleUseCase {
  add: (role: IAddRoleUseCase.Params) => Promise<IAddRoleUseCase.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IAddRoleUseCase {
  export type Params = {
    description: string;
  };

  export type Result = boolean;
}
