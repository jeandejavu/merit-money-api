export const signUpParamsSchema = {
  type: 'object',
  properties: {
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
  },
  required: ['name', 'email', 'password', 'password_confirmation'],
};
