import { IValidation } from '@/validation/protocols';
import { InvalidStrongPasswordError } from '@/presentation/errors';

const passwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export class StrongPasswordValidator implements IValidation {
  constructor(private readonly fieldName: string) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  validate(input: any): Error | boolean {
    if (!passwRegex.test(input[this.fieldName])) {
      return new InvalidStrongPasswordError();
    }
    return true;
  }
}
