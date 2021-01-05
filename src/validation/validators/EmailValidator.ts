import { IEmailValidator, IValidation } from '@/validation/protocols';
import { InvalidParamError } from '@/presentation/errors';

export class EmailValidator implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: IEmailValidator,
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  validate(input: any): Error | boolean {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
    return true;
  }
}
