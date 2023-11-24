import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport:
        'smtps://controlefinanceironest@gmail.com:ijrfmrvtbyicjgfr@smtp.gmail.com',
      // or
      // transport: {
      //   host: ' smtp.gmail.com',
      //   port: 465,
      //   ignoreTLS: false,
      //   secure: false,
      //   auth: {

      //     user: 'controlefinanceironest@gmail.com',
      //     pass: '100195Lucassouza@',
      //   },
      // },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
