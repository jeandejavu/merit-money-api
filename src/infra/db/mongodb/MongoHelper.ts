import { MongoClient, Collection } from 'mongodb';

export const MongoHelper = {
  client: (null as unknown) as MongoClient,
  uri: (null as unknown) as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = (null as unknown) as MongoClient;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri);
    }
    return this.client.db().collection(name);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  map: (data: any): any => {
    const { _id, ...rest } = data;
    return { ...rest, id: _id };
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c));
  },
};
