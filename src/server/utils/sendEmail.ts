import loglevel from 'loglevel';
import mailgun, {messages} from 'mailgun-js';

const mg = mailgun({
  apiKey: __MAIL_KEY__,
  domain: __MAIL_DOMAIN__,
});

export const sendEmail = async (data: messages.SendData) => {
  const asyncFunc = async () => mg.messages().send(data);

  let res = null;
  try {
    res = await asyncFunc();
  } catch (err) {
    loglevel.error(err);
  }

  return res;
};
