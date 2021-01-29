import nodemailer, { Transporter } from 'nodemailer';
import { IParse, ISendMail } from '@/data/protocols';

export class EtherealMail implements ISendMail {
  private client: Transporter;

  constructor(
    private defaultFromName: string,
    private defaultFromEmail: string,
    private mailTemplateParse: IParse,
  ) {
    this.getClient();
  }

  private async getClient(): Promise<Transporter> {
    if (this.client) return this.client;

    return new Promise(resolve => {
      nodemailer.createTestAccount().then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
        resolve(this.client);
      });
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail.Params): Promise<void> {
    const client = await this.getClient();
    const html = await this.mailTemplateParse.parse(templateData);
    const message = await client.sendMail({
      from: {
        name: from?.name || this.defaultFromName,
        address: from?.email || this.defaultFromEmail,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html,
    });

    // eslint-disable-next-line no-console
    console.log('Message sent: %s', message.messageId);
    // eslint-disable-next-line no-console
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
