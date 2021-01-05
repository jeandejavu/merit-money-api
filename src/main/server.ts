/* eslint-disable no-console */
import 'module-alias/register';
import 'dotenv/config';
import { MongoHelper } from '@/infra/db';

MongoHelper.connect(process.env.MONGO_URL as string)
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(process.env.PORT, () =>
      console.log(`Server running at http://localhost:${process.env.PORT}`),
    );
  })
  .catch(console.error);
