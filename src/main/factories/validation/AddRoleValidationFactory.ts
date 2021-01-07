import {
  ValidationComposite,
  RequiredFieldValidator,
} from '@/validation/validators';
import { IValidation } from '@/presentation/protocols';

export const makeAddRoleValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const field of ['description']) {
    validations.push(new RequiredFieldValidator(field));
  }
  return new ValidationComposite(validations);
};
