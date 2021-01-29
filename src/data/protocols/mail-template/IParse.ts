import { MailTemplate } from '@/domain/models';

export interface IParse {
  parse(data: IParse.Params): Promise<IParse.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IParse {
  export type Params = MailTemplate;
  export type Result = string;
}
