import {
  ValidationComposite,
  RequiredFieldValidator,
  CompareFieldsValidator,
  EmailValidator,
  StrongPasswordValidator,
} from '@/validation/validators';
import { IValidation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/infra/validators';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const field of [
    'name',
    'email',
    'password',
    'password_confirmation',
    'account_role_id',
    'avatar',
  ]) {
    validations.push(new RequiredFieldValidator(field));
  }
  validations.push(
    new CompareFieldsValidator('password', 'password_confirmation'),
  );
  validations.push(new EmailValidator('email', new EmailValidatorAdapter()));
  validations.push(new StrongPasswordValidator('password'));
  return new ValidationComposite(validations);
};
