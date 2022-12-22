import { Router } from "express";
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

const router = Router();

// send confirmation email to client
router.post('/sendEmail/confirmation', (req, res) => {
  const eventData = req.body.eventData;

  if (!eventData) return res.status(500).json('no data provided');
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

  // mail to customer
  const mailOptions = {
    from: `DJ Daniel Daub <${process.env.APPLICATION_EMAIL}>`,
    to: eventData.user.email,
    subject: `Eingangsbestätigung der Anfrage für den ${(new Date(eventData.event.date)).toLocaleDateString('de-DE')}`,
    template: 'emailTemplate',
    context: {
      subject: "Anfrage",
      salutation: "Herzlichen Dank für deine Anfrage!",
      message: `Hallo ${eventData.user.firstname}, \n\num alle weiteren Details zu besprechen trage dich bitte für ein kostenloses Erstgespräch ein. \n\n`,
      url: 'https://calendly.com/djdanieldaub/beratungsgespraech',
      url_name: 'Termin vereinbaren'
    }
  };

  // mail to dj
  const mailOptionsDj = {
    from: `WHOOOP NEUE ANFRAGE! <${process.env.APPLICATION_EMAIL}>`,
    to: process.env.APPLICATION_EMAIL,
    subject: `WHOOOP WHOOP Cash in die Tash! ${eventData.event.date}`,
    template: 'emailTemplate',
    context: {
      message: `Lieber Daniel, du hast eine neue Event Anfrage :) \n
        Persönliche Daten: \n
        Name: ${eventData.user.firstname} ${eventData.user.lastname} \n
        E-mail: ${eventData.user.email} \n
        Telefon: ${eventData.user.phone} \n\n
        Event: \n
        Anlass: ${eventData.event.occassion.name} \n
        Datum: ${eventData.event.date} \n
        Gäste: ${eventData.event.numberGuests.displayName} \n
        Dauer: ${eventData.event.duration.displayName} \n
        Musik: ${eventData.event.music.map(music => music.displayName)} \n
        Weitere Infos: ${eventData.user.information} \n\n
        Location:
        Locationname: ${eventData.location.locationName} \n
        PLZ: ${eventData.location.zipCode} \n
        Stadt: ${eventData.location.city} \n
        Technologie: ${eventData.location.eventTechnology.name} \n\n

        Have fun und HDL Cinja <3
      `
    }
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(`Error: ${err}`);
      res.status(500).json(err);
    } else {
      console.log("EMAIL sent", eventData);
      res.status(200).json('Email sent succesfully');
    }
  })
  transporter.sendMail(mailOptionsDj, (err, data) => {
    console.log('password', process.env.EMAIL_HOST_PASSWORD);
    if (err) {
      console.log(`Error: ${err}`);
      res.status(500).json(err);
    } else {
      console.log("EMAIL sent to DJ");
      res.status(200).json('Email sent succesfully');
    }
  })
})

export { router as EmailRouter }