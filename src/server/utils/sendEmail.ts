import loglevel from 'loglevel';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  pool: true,
  port: 2525,
  auth: {
    user: '1cf9bc4a456a3d', // generated by Mailtrap
    pass: '97cffdbb23c783', // generated by Mailtrap
  },
});

transport.verify(function(error) {
  if (error) return loglevel.error(error);
  loglevel.info('💌  Email transport is ready  💌');
});

export const sendEmail = async (opts: object) => {
  let email = null;
  try {
    email = await transport.sendMail(opts);
  } catch (err) {
    loglevel.error(err);
  }

  return email;
};
