import { HandlebarsMailTemplate } from '@/infra/mail-template';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import faker from 'faker';

const any_template = path.resolve(__dirname, 'any_template.hbs');

const makeSut = (): HandlebarsMailTemplate => {
  return new HandlebarsMailTemplate();
};

describe('HandlebarsMailTemplate', () => {
  describe('parse()', () => {
    test('Should success executation', async () => {
      const sut = makeSut();
      const readFile = jest.spyOn(fs.promises, 'readFile');
      const compile = jest.spyOn(handlebars, 'compile');

      const templateData = await sut.parse({
        file: any_template,
        variables: {
          any_variable: 'any_value',
        },
      });

      expect(templateData).toEqual('<p>any_value</p>\n');
      expect(readFile).toBeCalled();
      expect(compile).toBeCalled();
    });

    test('Should throw if file not exists throws', async () => {
      const sut = makeSut();

      const templateData = sut.parse({
        file: faker.system.filePath(),
        variables: {
          any_variable: 'any_value',
        },
      });

      expect(templateData).rejects.toThrow();
    });
  });
});
