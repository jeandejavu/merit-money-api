export const rolePath = {
  post: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Roles'],
    summary: 'API para criar função',
    description: 'Essa rota pode ser executada somente por usuários **admin**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addRoleParams',
          },
        },
      },
    },
    responses: {
      204: {
        description: 'Sucesso',
      },
      400: {
        $ref: '#/components/badRequest',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  get: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Roles'],
    summary: 'API para criar função',
    description: 'Essa rota pode ser executada somente por usuários **admin**',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/role',
            },
          },
        },
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
