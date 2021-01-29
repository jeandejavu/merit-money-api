import { Models } from './Models';

export class MailContact extends Models {
  constructor(readonly name: string, readonly email: string) {
    super();
  }
}
