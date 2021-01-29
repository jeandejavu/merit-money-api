import { MailContact, MailTemplate } from '@/domain/models';

export interface ISendMail {
  sendMail(data: ISendMail.Params): Promise<ISendMail.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ISendMail {
  export type Params = {
    to: MailContact;
    from?: MailContact;
    subject: string;
    templateData: MailTemplate;
  };
  export type Result = void;
}
