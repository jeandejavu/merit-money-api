export const roleSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
  required: ['id', 'description'],
};
