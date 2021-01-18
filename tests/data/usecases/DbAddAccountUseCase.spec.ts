import { throwError } from '@/tests/utils';
import { DbAddAccountUseCase } from '@/data/usecases';
import { mockAddAccountParams } from '@/tests/domain/mocks';
import { CheckFieldError, EmailInUseError } from '@/domain/errors';
import {
  AddAccountRepositorySpy,
  CheckAccountByEmailRepositorySpy,
} from '../mocks/db/account';
import { HasherSpy, SaveFileSpy } from '../mocks';
import { CheckRoleByIdRepositorySpy } from '../mocks/db';

type SutTypes = {
  sut: DbAddAccountUseCase;
  hasherSpy: HasherSpy;
  addAccountRepositorySpy: AddAccountRepositorySpy;
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy;
  checkRoleByIdRepositorySpy: CheckRoleByIdRepositorySpy;
  saveFileSpy: SaveFileSpy;
};

const makeSut = (): SutTypes => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy();
  const hasherSpy = new HasherSpy();
  const addAccountRepositorySpy = new AddAccountRepositorySpy();
  const checkRoleByIdRepositorySpy = new CheckRoleByIdRepositorySpy();
  const saveFileSpy = new SaveFileSpy();
  const sut = new DbAddAccountUseCase(
    hasherSpy,
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
    checkRoleByIdRepositorySpy,
    saveFileSpy,
  );
  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
    checkRoleByIdRepositorySpy,
    saveFileSpy,
  };
};

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct plaintext', async () => {
    const { sut, hasherSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(hasherSpy.plaintext).toBe(addAccountParams.password);
  });

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut();
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError);
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(addAccountRepositorySpy.params).toEqual({
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: hasherSpy.digest,
      account_role: addAccountParams.account_role,
      avatar: addAccountParams.avatar.filename,
    });
  });

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut();
    jest
      .spyOn(addAccountRepositorySpy, 'add')
      .mockImplementationOnce(throwError);
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should return true on success', async () => {
    const { sut } = makeSut();
    const isValid = await sut.add(mockAddAccountParams());
    expect(isValid).toBe(true);
  });

  test('Should return false if AddAccountRepository returns false', async () => {
    const { sut, addAccountRepositorySpy } = makeSut();
    addAccountRepositorySpy.result = false;
    const isValid = await sut.add(mockAddAccountParams());
    expect(isValid).toBe(false);
  });

  test('Should throw instanceof EmailInUseError if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut();
    checkAccountByEmailRepositorySpy.result = true;
    const isValid = sut.add(mockAddAccountParams());
    expect(isValid).rejects.toBeInstanceOf(EmailInUseError);
  });

  test('Should throw if CheckAccountByEmailRepository throws', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut();
    jest
      .spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail')
      .mockImplementationOnce(throwError);
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should call CheckAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountParams.email);
  });

  test('Should throw instanceof CheckFieldError if CheckRoleByIdRepository returns false', async () => {
    const { sut, checkRoleByIdRepositorySpy } = makeSut();
    checkRoleByIdRepositorySpy.result = false;
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toBeInstanceOf(CheckFieldError);
  });

  test('Should throw if CheckRoleByIdRepository throws', async () => {
    const { sut, checkRoleByIdRepositorySpy } = makeSut();
    jest
      .spyOn(checkRoleByIdRepositorySpy, 'checkById')
      .mockImplementationOnce(throwError);
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should call CheckRoleByIdRepository with correct role id', async () => {
    const { sut, checkRoleByIdRepositorySpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(checkRoleByIdRepositorySpy.id).toBe(
      addAccountParams.account_role.id,
    );
  });

  test('Should call SaveFile with correct values', async () => {
    const { sut, saveFileSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(saveFileSpy.params).toEqual(addAccountParams.avatar.filename);
  });

  test('Should throw if SaveFile throws', async () => {
    const { sut, saveFileSpy } = makeSut();
    jest.spyOn(saveFileSpy, 'saveFile').mockImplementationOnce(throwError);
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });
});
