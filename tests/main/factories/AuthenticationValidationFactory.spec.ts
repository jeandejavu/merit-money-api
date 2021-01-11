import { makeAuthenticationValidation } from '@/main/factories';
import {
  ValidationComposite,
  RequiredFieldValidator,
  EmailValidator,
} from '@/validation/validators';
import { IValidation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/infra/validators';

jest.mock('@/validation/validators/ValidationComposite');

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAuthenticationValidation();
    const validations: IValidation[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidator(field));
    }
    validations.push(new EmailValidator('email', new EmailValidatorAdapter()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
