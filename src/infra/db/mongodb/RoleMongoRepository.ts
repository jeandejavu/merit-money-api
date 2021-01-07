import { MongoHelper } from '@/infra/db/mongodb';
import { ObjectID } from 'mongodb';
import {
  IAddRoleRepository,
  ICheckRoleByDescriptionRepository,
  ICheckRoleByIdRepository,
  IListRolesRepository,
} from '@/data/protocols/db';

export class RoleMongoRepository
  implements
    IAddRoleRepository,
    ICheckRoleByDescriptionRepository,
    IListRolesRepository,
    ICheckRoleByIdRepository {
  async add(
    data: IAddRoleRepository.Params,
  ): Promise<IAddRoleRepository.Result> {
    const roleCollection = await MongoHelper.getCollection('roles');
    const result = await roleCollection.insertOne({
      _id: new ObjectID(data.id),
      description: data.description,
    });
    return result.ops[0] !== null;
  }

  async checkByDescription(
    description: string,
  ): Promise<ICheckRoleByDescriptionRepository.Result> {
    const roleCollection = await MongoHelper.getCollection('roles');
    const role = await roleCollection.findOne(
      {
        description,
      },
      {
        projection: {
          _id: 1,
        },
      },
    );
    return role !== null;
  }

  async checkById(id: string): Promise<ICheckRoleByIdRepository.Result> {
    if (!ObjectID.isValid(id)) return false;
    const roleCollection = await MongoHelper.getCollection('roles');
    const role = await roleCollection.findOne(
      {
        _id: new ObjectID(id),
      },
      {
        projection: {
          _id: 1,
        },
      },
    );
    return role !== null;
  }

  async list(): Promise<IListRolesRepository.Result> {
    const roleCollection = await MongoHelper.getCollection('roles');
    const roles = await roleCollection.find({}).toArray();
    return MongoHelper.mapCollection(roles);
  }
}
