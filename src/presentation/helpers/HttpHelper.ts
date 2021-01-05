import { IHttpResponse } from '@/presentation/protocols';
import { ServerError } from '@/presentation/errors';

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error,
});

export const forbidden = (error: Error): IHttpResponse => ({
  statusCode: 403,
  body: error,
});

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack ?? ''),
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data,
});

export const noContent = (): IHttpResponse => ({
  statusCode: 204,
  body: null,
});
