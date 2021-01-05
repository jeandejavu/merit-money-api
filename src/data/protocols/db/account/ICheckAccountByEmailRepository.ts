export interface ICheckAccountByEmailRepository {
  checkByEmail: (
    email: string,
  ) => Promise<ICheckAccountByEmailRepository.Result>;
}
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ICheckAccountByEmailRepository {
  export type Result = boolean;
}
