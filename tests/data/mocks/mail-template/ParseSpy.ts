import { IParse, ITemplateVariables } from '@/data/protocols';
import faker from 'faker';

export class ParseSpy implements IParse {
  file = faker.system.fileName();

  variables: ITemplateVariables = { teste: 'teste' };

  async parse({ file, variables }: IParse.Params): Promise<IParse.Result> {
    this.file = file;
    this.variables = variables;
    return '';
  }
}
