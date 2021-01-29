import { EtherealMail } from '@/infra/mail';
import { HandlebarsMailTemplate } from '@/infra/mail-template';

export const makeEtherealMailFactory = (): EtherealMail => {
  return new EtherealMail(
    'any_name',
    'any_mail@mail.com',
    new HandlebarsMailTemplate(),
  );
};
