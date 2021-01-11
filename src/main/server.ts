/* eslint-disable no-console */
import 'module-alias/register';
import 'dotenv/config';
import env from '@/main/config/env';
import { MongoHelper } from '@/infra/db';

process.env.TZ = 'Europe/London';

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`),
    );
  })
  .catch(console.error);
