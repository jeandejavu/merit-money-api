import { AuthMiddleware } from '@/presentation/middlewares';
import { forbidden, ok, serverError } from '@/presentation/helpers';
import { AccessDeniedError } from '@/presentation/errors';
import { throwError } from '@/tests/utils';
import { DecrypterSpy } from '@/tests/data/mocks/cryptography/DecrypterSpy';

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: 'any_token',
});

type SutTypes = {
  sut: AuthMiddleware;
  decrypter: DecrypterSpy;
};

const makeSut = (): SutTypes => {
  const decrypter = new DecrypterSpy();
  const sut = new AuthMiddleware(decrypter);
  return {
    sut,
    decrypter,
  };
};

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should return 403 if Decrypter returns null', async () => {
    const { sut, decrypter } = makeSut();
    decrypter.result = undefined;
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should return 200 if Decrypter returns an account', async () => {
    const { sut, decrypter } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(
      ok({
        account_id: decrypter.result,
      }),
    );
  });

  test('Should return 500 if Decrypter throws', async () => {
    const { sut, decrypter } = makeSut();
    jest.spyOn(decrypter, 'decrypt').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
