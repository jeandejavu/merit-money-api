import { makeAddRoleValidation } from '@/main/factories';
import {
  ValidationComposite,
  RequiredFieldValidator,
} from '@/validation/validators';
import { IValidation } from '@/presentation/protocols';

jest.mock('@/validation/validators/ValidationComposite');

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddRoleValidation();
    const validations: IValidation[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const field of ['description']) {
      validations.push(new RequiredFieldValidator(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
