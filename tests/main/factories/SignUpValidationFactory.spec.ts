import { makeSignUpValidation } from '@/main/factories';
import {
  ValidationComposite,
  RequiredFieldValidator,
  CompareFieldsValidator,
  EmailValidator,
  StrongPasswordValidator,
  ImageTypeValidator,
} from '@/validation/validators';
import { IValidation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/infra/validators';
import { makeJpegType, makePngType } from '@/validation/helpers/ImageTypes';

jest.mock('@/validation/validators/ValidationComposite');

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
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
    validations.push(
      new ImageTypeValidator('avatar', [makeJpegType(), makePngType()]),
    );
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
