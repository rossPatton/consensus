import Koa from 'koa';
import mailgun, {messages} from 'mailgun-js';

const mg = mailgun({
  apiKey: __MAIL_KEY__,
  domain: __MAIL_DOMAIN__,
});

export const sendEmail = async (
  ctx: Koa.ParameterizedContext,
  data: messages.SendData,
) => {
  const asyncFunc = async () => mg.messages().send(data);

  let res = null;
  try {
    res = await asyncFunc();
  } catch (err) {
    ctx.throw(500, err);
  }

  return res;
};
