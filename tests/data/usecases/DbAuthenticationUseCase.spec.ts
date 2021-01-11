import { DbAuthentication } from '@/data/usecases';
import { InvalidAuthenticationError } from '@/domain/errors';
import {
  HashComparerSpy,
  EncrypterSpy,
  FindAccountByEmailRepositorySpy,
} from '@/tests/data/mocks';

import { mockAuthenticationParams } from '@/tests/domain/mocks';
import { throwError } from '@/tests/utils';

type SutTypes = {
  sut: DbAuthentication;
  findAccountByEmailRepositorySpy: FindAccountByEmailRepositorySpy;
  hashComparerSpy: HashComparerSpy;
  encrypterSpy: EncrypterSpy;
};

const makeSut = (): SutTypes => {
  const findAccountByEmailRepositorySpy = new FindAccountByEmailRepositorySpy();
  const hashComparerSpy = new HashComparerSpy();
  const encrypterSpy = new EncrypterSpy();
  const sut = new DbAuthentication(
    findAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
  );
  return {
    sut,
    findAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
  };
};

describe('DbAuthentication UseCase', () => {
  test('Should call FindAccountByEmailRepository with correct email', async () => {
    const { sut, findAccountByEmailRepositorySpy } = makeSut();
    const authenticationParams = mockAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(findAccountByEmailRepositorySpy.email).toBe(
      authenticationParams.email,
    );
  });

  test('Should throw if FindAccountByEmailRepository throws', async () => {
    const { sut, findAccountByEmailRepositorySpy } = makeSut();
    jest
      .spyOn(findAccountByEmailRepositorySpy, 'findByEmail')
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should throw InvalidAuthenticationError if FindAccountByEmailRepository returns undefined', async () => {
    const { sut, findAccountByEmailRepositorySpy } = makeSut();
    findAccountByEmailRepositorySpy.result = undefined;
    const promise = sut.auth(mockAuthenticationParams());
    expect(promise).rejects.toBeInstanceOf(InvalidAuthenticationError);
  });

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, findAccountByEmailRepositorySpy } = makeSut();
    const authenticationParams = mockAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(hashComparerSpy.plaintext).toBe(authenticationParams.password);
    expect(hashComparerSpy.digest).toBe(
      findAccountByEmailRepositorySpy.result?.password,
    );
  });

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut();
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should throw InvalidAuthenticationError if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut();
    hashComparerSpy.isValid = false;
    const promise = sut.auth(mockAuthenticationParams());
    expect(promise).rejects.toBeInstanceOf(InvalidAuthenticationError);
  });

  test('Should call Encrypter with correct plaintext', async () => {
    const { sut, encrypterSpy, findAccountByEmailRepositorySpy } = makeSut();
    await sut.auth(mockAuthenticationParams());
    expect(encrypterSpy.plaintext).toBe(
      findAccountByEmailRepositorySpy.result?.id,
    );
  });

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut();
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should return an data on success', async () => {
    const { sut, encrypterSpy, findAccountByEmailRepositorySpy } = makeSut();
    const { accessToken, name } = await sut.auth(mockAuthenticationParams());
    expect(accessToken).toBe(encrypterSpy.ciphertext);
    expect(name).toBe(findAccountByEmailRepositorySpy.result?.name);
  });
});
