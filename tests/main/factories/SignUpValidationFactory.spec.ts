import { makeSignUpValidation } from '@/main/factories';
import {
  ValidationComposite,
  RequiredFieldValidator,
  CompareFieldsValidator,
  EmailValidator,
} from '@/validation/validators';
import { IValidation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/infra/validators';

jest.mock('@/validation/validators/ValidationComposite');

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: IValidation[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidator(field));
    }
    validations.push(
      new CompareFieldsValidator('password', 'passwordConfirmation'),
    );
    validations.push(new EmailValidator('email', new EmailValidatorAdapter()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
