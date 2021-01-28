import handlebars from 'handlebars';
import fs from 'fs';
import { IParse } from '@/data/protocols';

export class HandlebarsMailTemplate implements IParse {
  public async parse({
    file,
    variables,
  }: IParse.Params): Promise<IParse.Result> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
