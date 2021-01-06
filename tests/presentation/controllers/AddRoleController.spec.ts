import { AddRoleController } from '@/presentation/controllers';
import {
  MissingParamError,
  ServerError,
  FieldAlreadyExists,
} from '@/presentation/errors';
import {
  serverError,
  badRequest,
  forbidden,
  noContent,
} from '@/presentation/helpers';
import { ValidationSpy, AddRoleSpy } from '@/tests/presentation/mocks';
import { throwError } from '@/tests/utils';

import faker from 'faker';

const mockRequest = (): AddRoleController.Request => {
  return {
    description: faker.name.jobTitle(),
  };
};

type SutTypes = {
  sut: AddRoleController;
  addRoleSpy: AddRoleSpy;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const addRoleSpy = new AddRoleSpy();
  const validationSpy = new ValidationSpy();
  const sut = new AddRoleController(addRoleSpy, validationSpy);
  return {
    sut,
    addRoleSpy,
    validationSpy,
  };
};

describe('AddRole Controller', () => {
  test('Should return 500 if AddRole throws', async () => {
    const { sut, addRoleSpy } = makeSut();
    jest.spyOn(addRoleSpy, 'add').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(undefined)));
  });

  test('Should call AddRole with correct values', async () => {
    const { sut, addRoleSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(addRoleSpy.params).toEqual({
      description: request.description,
    });
  });

  test('Should return 403 if AddRole returns false', async () => {
    const { sut, addRoleSpy } = makeSut();
    addRoleSpy.result = false;
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(
      forbidden(new FieldAlreadyExists('description')),
    );
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
