import { EmailValidator } from '@/validation/validators';
import { InvalidParamError } from '@/presentation/errors';
import { EmailValidatorSpy } from '@/tests/validation/mocks';
import { throwError } from '@/tests/utils';

import faker from 'faker';

const field = faker.random.word();

type SutTypes = {
  sut: EmailValidator;
  emailValidatorSpy: EmailValidatorSpy;
};

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy();
  const sut = new EmailValidator(field, emailValidatorSpy);
  return {
    sut,
    emailValidatorSpy,
  };
};

describe('Email Validator', () => {
  test('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut();
    emailValidatorSpy.isEmailValid = false;
    const email = faker.internet.email();
    const error = sut.validate({ [field]: email });
    expect(error).toEqual(new InvalidParamError(field));
  });

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut();
    const email = faker.internet.email();
    sut.validate({ [field]: email });
    expect(emailValidatorSpy.email).toBe(email);
  });

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut();
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(throwError);
    expect(sut.validate).toThrow();
  });
});
