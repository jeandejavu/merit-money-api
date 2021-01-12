import {
  errorSchema,
  signUpParamsSchema,
  loginParamsSchema,
  accountSchema,
  addRoleParamsSchema,
  roleSchema,
} from './schemas/';

export default {
  signUpParams: signUpParamsSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  account: accountSchema,
  addRoleParams: addRoleParamsSchema,
  role: roleSchema,
};
