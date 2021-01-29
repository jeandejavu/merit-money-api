export const signUpParamsSchema = {
  type: 'object',
  properties: {
    avatar: {
      type: 'file',
    },
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    password_confirmation: {
      type: 'string',
    },
    account_role_id: {
      type: 'string',
    },
  },
  required: [
    'avatar',
    'name',
    'email',
    'password',
    'password_confirmation',
    'account_role_id',
  ],
};
