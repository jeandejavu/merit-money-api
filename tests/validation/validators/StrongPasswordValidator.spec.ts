import { StrongPasswordValidator } from '@/validation/validators';
import { InvalidStrongPasswordError } from '@/presentation/errors';

import faker from 'faker';

const field = faker.random.word();

const makeSut = (): StrongPasswordValidator => {
  return new StrongPasswordValidator(field);
};

describe('RequiredField Validator', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate('123456');
    expect(error).toEqual(new InvalidStrongPasswordError());
  });

  test('Should not return if validation succeeds', () => {
    const sut = makeSut();
    const error = sut.validate({ [field]: 'GKB@oUkTxRm9' });
    expect(error).toBe(true);
  });
});
