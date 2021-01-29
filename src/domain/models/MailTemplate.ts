import { Models } from './Models';

export interface ITemplateVariables {
  [key: string]: string | number;
}

export class MailTemplate extends Models {
  constructor(readonly file: string, readonly variables: ITemplateVariables) {
    super();
  }
}
