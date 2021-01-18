export interface IFindAccountByEmailRepository {
  findByEmail: (email: string) => Promise<IFindAccountByEmailRepository.Result>;
}
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IFindAccountByEmailRepository {
  export type Result =
    | {
        id: string;
        name: string;
        password: string;
        avatar: string;
      }
    | undefined;
}
