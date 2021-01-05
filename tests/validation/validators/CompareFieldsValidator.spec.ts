import { CompareFieldsValidator } from '@/validation/validators';
import { InvalidParamError } from '@/presentation/errors';

import faker from 'faker';

const field = faker.random.word();
const fieldToCompare = faker.random.word();

const makeSut = (): CompareFieldsValidator => {
  return new CompareFieldsValidator(field, fieldToCompare);
};

describe('CompareFieldsValidator', () => {
  test('Should return an InvalidParamError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({
      [field]: 'any_field',
      [fieldToCompare]: 'other_field',
    });
    expect(error).toEqual(new InvalidParamError(fieldToCompare));
  });

  test('Should not return if validation succeeds', () => {
    const sut = makeSut();
    const value = faker.random.word();
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });
    expect(error).toBe(true);
  });
});
