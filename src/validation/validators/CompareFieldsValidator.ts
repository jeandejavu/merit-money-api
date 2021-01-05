import { IValidation } from '@/validation/protocols';
import { InvalidParamError } from '@/presentation/errors';

export class CompareFieldsValidator implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string,
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  validate(input: any): Error | boolean {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName);
    }
    return true;
  }
}
