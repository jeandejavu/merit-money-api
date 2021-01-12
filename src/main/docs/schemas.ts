import {
  errorSchema,
  signUpParamsSchema,
  loginParamsSchema,
  accountSchema,
} from './schemas/';

export default {
  signUpParams: signUpParamsSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  account: accountSchema,
};
