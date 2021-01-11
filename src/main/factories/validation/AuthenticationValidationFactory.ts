import {
  ValidationComposite,
  RequiredFieldValidator,
  EmailValidator,
} from '@/validation/validators';
import { IValidation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/infra/validators';

export const makeAuthenticationValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidator(field));
  }
  validations.push(new EmailValidator('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
