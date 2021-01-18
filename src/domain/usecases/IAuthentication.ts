export interface IAuthentication {
  auth: (
    authenticationParams: IAuthentication.Params,
  ) => Promise<IAuthentication.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IAuthentication {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
    name: string;
    avatar: string;
  };
}
