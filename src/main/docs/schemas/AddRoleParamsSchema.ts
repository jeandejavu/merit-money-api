export const addRoleParamsSchema = {
  type: 'object',
  properties: {
    description: {
      type: 'string',
    },
  },
  required: ['description'],
};
