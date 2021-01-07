export interface ICheckRoleByIdRepository {
  checkById: (id: string) => Promise<ICheckRoleByIdRepository.Result>;
}
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ICheckRoleByIdRepository {
  export type Result = boolean;
}
