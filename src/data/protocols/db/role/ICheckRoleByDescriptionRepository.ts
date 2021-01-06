export interface ICheckRoleByDescriptionRepository {
  checkByDescription: (
    description: string,
  ) => Promise<ICheckRoleByDescriptionRepository.Result>;
}
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ICheckRoleByDescriptionRepository {
  export type Result = boolean;
}
