import faker from 'faker';
import { EtherealMail } from '@/infra/mail';
import { ParseSpy } from '@/tests/data/mocks/mail-template';
import { ISendMail } from '@/data/protocols';
import nodemailer from 'nodemailer';

const defaultName = faker.name.firstName();
const defaultMail = faker.internet.email();

const params: ISendMail.Params = {
  subject: faker.name.title(),
  templateData: {
    file: faker.system.fileName(),
    variables: {
      any_variable: faker.random.alpha(),
    },
  },
  from: {
    email: faker.internet.email(),
    name: faker.name.findName(),
  },
  to: {
    email: faker.internet.email(),
    name: faker.name.findName(),
  },
};

const makeSut = async (): Promise<EtherealMail> => {
  const parseSpy = new ParseSpy();
  return new EtherealMail(
    defaultName,
    defaultMail,
    parseSpy,
    nodemailer.createTestAccount().then(account =>
      nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      }),
    ),
  );
};

describe('EtherealMail', () => {
  describe('sendMail()', () => {
    test('Should success executation', async () => {
      const sut = await makeSut();

      await expect(sut.sendMail(params)).resolves.toBeUndefined();
    }, 15000);

    test('Should execute with default email', async () => {
      const sut = await makeSut();
      await expect(
        sut.sendMail({ ...params, from: undefined }),
      ).resolves.toBeUndefined();
    }, 15000);
  });
});
