import { throwError } from '@/tests/utils';
import { DbAddRoleUseCase } from '@/data/usecases';
import { mockAddRoleParams } from '@/tests/domain/mocks';
import {
  AddRoleRepositorySpy,
  CheckRoleByDescriptionRepositorySpy,
} from '../mocks/db';
import { GenerateIDSpy } from '../mocks/id';

type SutTypes = {
  sut: DbAddRoleUseCase;
  addRoleRepositorySpy: AddRoleRepositorySpy;
  generateIDSpy: GenerateIDSpy;
  checkRoleByDescriptionRepositorySpy: CheckRoleByDescriptionRepositorySpy;
};

const makeSut = (): SutTypes => {
  const addRoleRepositorySpy = new AddRoleRepositorySpy();
  const checkRoleByDescriptionRepositorySpy = new CheckRoleByDescriptionRepositorySpy();
  const generateIDSpy = new GenerateIDSpy();
  const sut = new DbAddRoleUseCase(
    addRoleRepositorySpy,
    checkRoleByDescriptionRepositorySpy,
    generateIDSpy,
  );
  return {
    sut,
    addRoleRepositorySpy,
    generateIDSpy,
    checkRoleByDescriptionRepositorySpy,
  };
};

describe('DbAddRole Usecase', () => {
  test('Should call GenerateID', async () => {
    const { sut, generateIDSpy } = makeSut();
    const generateID = jest.spyOn(generateIDSpy, 'generateID');
    await sut.add(mockAddRoleParams());
    await expect(generateID).toBeCalledTimes(1);
  });

  test('Should throw if GenerateID throws', async () => {
    const { sut, generateIDSpy } = makeSut();
    jest.spyOn(generateIDSpy, 'generateID').mockImplementationOnce(throwError);
    const promise = sut.add(mockAddRoleParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should call AddRoleRepository with correct values', async () => {
    const { sut, addRoleRepositorySpy, generateIDSpy } = makeSut();
    const addRoleParams = mockAddRoleParams();
    await sut.add(addRoleParams);
    expect(addRoleRepositorySpy.params).toEqual({
      id: generateIDSpy.id,
      description: addRoleParams.description,
    });
  });

  test('Should throw if AddRoleRepository throws', async () => {
    const { sut, addRoleRepositorySpy } = makeSut();
    jest.spyOn(addRoleRepositorySpy, 'add').mockImplementationOnce(throwError);
    const promise = sut.add(mockAddRoleParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should return false if AddRoleRepository returns false', async () => {
    const { sut, addRoleRepositorySpy } = makeSut();
    addRoleRepositorySpy.result = false;
    const isValid = await sut.add(mockAddRoleParams());
    expect(isValid).toBe(false);
  });

  test('Should return true on success', async () => {
    const { sut } = makeSut();
    const isValid = await sut.add(mockAddRoleParams());
    expect(isValid).toBe(true);
  });

  test('Should call CheckRoleByDescriptionRepository with correct values', async () => {
    const { sut, checkRoleByDescriptionRepositorySpy } = makeSut();
    const checkByDescription = jest.spyOn(
      checkRoleByDescriptionRepositorySpy,
      'checkByDescription',
    );
    const addRoleParams = mockAddRoleParams();
    await sut.add(addRoleParams);
    expect(checkByDescription).toBeCalledTimes(1);
  });

  test('Should return false if CheckRoleByDescriptionRepository returns true', async () => {
    const { sut, checkRoleByDescriptionRepositorySpy } = makeSut();
    checkRoleByDescriptionRepositorySpy.result = true;
    const isValid = await sut.add(mockAddRoleParams());
    expect(isValid).toBe(false);
  });

  test('Should throw if CheckRoleByDescriptionRepository throws', async () => {
    const { sut, checkRoleByDescriptionRepositorySpy } = makeSut();
    jest
      .spyOn(checkRoleByDescriptionRepositorySpy, 'checkByDescription')
      .mockImplementationOnce(throwError);
    const promise = sut.add(mockAddRoleParams());
    await expect(promise).rejects.toThrow();
  });
});
