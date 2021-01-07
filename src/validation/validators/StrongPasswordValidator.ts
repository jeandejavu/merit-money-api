import { IValidation } from '@/validation/protocols';
import { InvalidStrongPasswordError } from '@/presentation/errors';

const passwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export class StrongPasswordValidator implements IValidation {
  constructor(private readonly fieldName: string) {}

  validate(password: string): Error | boolean {
    if (!passwRegex.test(password)) {
      return new InvalidStrongPasswordError();
    }
    return true;
  }
}
