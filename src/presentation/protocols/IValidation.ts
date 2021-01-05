export interface IValidation {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate: (input: any) => Error | boolean;
}
