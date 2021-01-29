import { ISendMail } from '@/data/protocols';

export class SendMailSpy implements ISendMail {
  data: ISendMail.Params;

  async sendMail(data: ISendMail.Params): Promise<ISendMail.Result> {
    this.data = data;
  }
}
