import { IValidation } from '@/presentation/protocols';

export class ValidationComposite implements IValidation {
  constructor(private readonly validations: IValidation[]) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  validate(input: any): Error | boolean {
    // eslint-disable-next-line no-restricted-syntax
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error instanceof Error) {
        return error;
      }
    }

    return true;
  }
}
