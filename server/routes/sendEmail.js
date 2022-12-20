import { Router } from "express";
import nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import hbs from 'nodemailer-express-handlebars';

const router = Router();

// send confirmation email to client
router.post('/sendEmail/confirmation', (req, res) => {
  const eventData = req.body.eventData;
  // console.log(eventData, __dirname);

  const source = fs.readFileSync(path.join(path.resolve(), 'templates', 'emailTemplate.hbs'), 'utf-8');

  if(!eventData) return res.status(500).json('no data provided');
  const transporter = nodemailer.createTransport({
    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_HOST,
    secure: true,
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_HOST_PASSWORD
    }
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extname: '.hbs',
        layoutsDir: './templates/',
        defaultLayout: 'emailTemplate',
      },
      viewPath: './templates/',
      extName: '.hbs'
    })
  )

  const mailOptions = {
    from: `DJ Daniel Daub <${process.env.APPLICATION_EMAIL}>`,
    to: eventData.user.email,
    subject: `Eingangsbestätigung für die Anfrage vom ${(new Date(eventData.event.date)).toLocaleDateString('de-DE')}`,
    template: 'emailTemplate',
    context: {
      message: 'test',
    }
  };

  transporter.sendMail(mailOptions, (err, data) => {
    console.log('password',process.env.EMAIL_HOST_PASSWORD);
    if(err) {
      console.log(`Error: ${err}`);
      res.status(500).json(err);
    } else {
      console.log("EMAIL sent");
      res.status(200).json('Email sent succesfully');
    }
  })
})

export {router as EmailRouter}