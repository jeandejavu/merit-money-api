import { IValidation } from '@/validation/protocols';
import { MissingParamError } from '@/presentation/errors';

export class RequiredFieldValidator implements IValidation {
  constructor(private readonly fieldName: string) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  validate(input: any): Error | boolean {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
    return false;
  }
}
