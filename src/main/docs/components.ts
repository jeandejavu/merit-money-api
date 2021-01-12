import { apiKeyAuthSchema } from './schemas/';
import {
  badRequest,
  serverError,
  notFound,
  forbidden,
  unauthorized,
} from './components/';

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
  },
  badRequest,
  serverError,
  notFound,
  forbidden,
  unauthorized,
};
