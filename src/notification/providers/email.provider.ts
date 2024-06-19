import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sg, { MailDataRequired } from '@sendgrid/mail';
import { EmailServicesEnum, IEmailMessage } from '../enums/emails';

@Injectable()
export class EmailService {
  private APIKEY: string;
  private service: string;
  private from: string;
  private logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    const apiKey = configService.get('SENDGRID_API_KEY');
    this.APIKEY = apiKey;
    sg.setApiKey(this.APIKEY);
    this.from = configService.get('MAILER_FROM_OPTION');
  }

  public async send(mailObj: IEmailMessage) {
    mailObj.from = this.from;
    switch (this.service) {
      case EmailServicesEnum.SENDGRID:
        const sgResponse = await sg.send(<MailDataRequired>mailObj, false);
        this.logger.log({ sgResponse });
        return sgResponse;

      default:
        throw new Error('Mailing service not selected');
    }
  }
}
