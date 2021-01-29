import { IParse } from '@/data/protocols';
import { ITemplateVariables } from '@/domain/models';
import faker from 'faker';

export class ParseSpy implements IParse {
  file = faker.system.fileName();

  variables: ITemplateVariables = { teste: 'teste' };

  async parse({ file, variables }: IParse.Params): Promise<IParse.Result> {
    this.file = file;
    this.variables = variables;
    return faker.random.alpha();
  }
}
