import nodemailer, { Transporter } from 'nodemailer';
import { IParse, ISendMail } from '@/data/protocols';

export class EtherealMail implements ISendMail {
  constructor(
    private defaultFromName: string,
    private defaultFromEmail: string,
    private mailTemplateParse: IParse,
    private transporter: Promise<Transporter>,
  ) {}

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail.Params): Promise<void> {
    const html = await this.mailTemplateParse.parse(templateData);
    const transporter = await this.transporter;
    const message = await transporter.sendMail({
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
