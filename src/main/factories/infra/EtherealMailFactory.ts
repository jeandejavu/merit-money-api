import { EtherealMail } from '@/infra/mail';
import { HandlebarsMailTemplate } from '@/infra/mail-template';
import nodemailer from 'nodemailer';

export const makeEtherealMailFactory = (): EtherealMail => {
  return new EtherealMail(
    'any_name',
    'any_mail@mail.com',
    new HandlebarsMailTemplate(),
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
