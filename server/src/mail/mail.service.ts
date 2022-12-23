import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
@Injectable()
export class MailService {
  transporter: nodemailer.Transporter<SMTPTransport.Options>;
  constructor() {
    console.log('process.env.SMTP_EMAIL = ', process.env.SMTP_EMAIL);
    console.log('process.env.SMTP_PASSWORD = ', process.env.SMTP_PASSWORD);
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  sendActivationMail(to, link) {
    try {
      this.transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: to,
        subject: 'Активация акканта на ' + process.env.API_URL,
        text: '',
        html: `
      <div>
        <h1>Для активации перейдите по ссылке</h1>
        <a href='${link}'>${link}</a>
      </div>
      `,
      });
    } catch (e) {
      console.error('sendActivationMail error: ', e);
    }
  }
}
