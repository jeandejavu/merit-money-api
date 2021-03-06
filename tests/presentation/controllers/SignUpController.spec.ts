import { SignUpController } from '@/presentation/controllers';
import { MissingParamError, ServerError } from '@/presentation/errors';
import {
  serverError,
  badRequest,
  forbidden,
  noContent,
} from '@/presentation/helpers';
import { SendMailSpy } from '@/tests/data/mocks/mail/SendMailSpy';
import { mockRoleModel } from '@/tests/domain/mocks';
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
    account_role_id: mockRoleModel().id,
    avatar: {
      filename: faker.system.fileName('jpg'),
    },
  };
};

type SutTypes = {
  sut: SignUpController;
  addAccountSpy: AddAccountSpy;
  validationSpy: ValidationSpy;
  sendMailSpy: SendMailSpy;
};

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy();
  const validationSpy = new ValidationSpy();
  const sendMailSpy = new SendMailSpy();
  const sut = new SignUpController(addAccountSpy, validationSpy, sendMailSpy);
  return {
    sut,
    addAccountSpy,
    validationSpy,
    sendMailSpy,
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
      account_role: {
        id: request.account_role_id,
      },
      avatar: {
        filename: request.avatar.filename,
      },
    });
  });

  test('Should return 403 if AddAccount returns false', async () => {
    const { sut, addAccountSpy } = makeSut();
    addAccountSpy.result = false;
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new Error('Error add account')));
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

  test('Should call SendMail with correct value', async () => {
    const { sut, sendMailSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(sendMailSpy.data.to.email).toEqual(request.email);
    expect(sendMailSpy.data.to.name).toEqual(request.name);
  });

  test('Should return 400 if SendMail returns an error', async () => {
    const { sut, sendMailSpy } = makeSut();
    jest.spyOn(sendMailSpy, 'sendMail').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(undefined)));
  });

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
