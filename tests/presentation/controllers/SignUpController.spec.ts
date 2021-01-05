import { SignUpController } from '@/presentation/controllers';
import {
  MissingParamError,
  ServerError,
  EmailInUseError,
} from '@/presentation/errors';
import {
  serverError,
  badRequest,
  forbidden,
  noContent,
} from '@/presentation/helpers';
import { ValidationSpy, AddAccountSpy } from '@/tests/presentation/mocks';
import { throwError } from '@/tests/utils';

import faker from 'faker';

const mockRequest = (): SignUpController.Request => {
  const password = faker.internet.password();
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    password_confirmation: password,
  };
};

type SutTypes = {
  sut: SignUpController;
  addAccountSpy: AddAccountSpy;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy();
  const validationSpy = new ValidationSpy();
  const sut = new SignUpController(addAccountSpy, validationSpy);
  return {
    sut,
    addAccountSpy,
    validationSpy,
  };
};

describe('SignUp Controller', () => {
  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut();
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(undefined)));
  });

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(addAccountSpy.params).toEqual({
      name: request.name,
      email: request.email,
      password: request.password,
    });
  });

  test('Should return 403 if AddAccount returns false', async () => {
    const { sut, addAccountSpy } = makeSut();
    addAccountSpy.result = false;
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
  });

  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(validationSpy.input).toEqual(request);
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError(faker.random.word());
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(validationSpy.error));
  });

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
