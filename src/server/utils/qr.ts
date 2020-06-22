import Koa from 'koa';
import {toDataURL} from 'qrcode';
import speakeasy from 'speakeasy';

/**
 * generates a QR code data uri image that can be used to get TOTP codes
 */
export const qr = async (ctx: Koa.ParameterizedContext) => {
  const secret = speakeasy.generateSecret({length: 20});

  const otpAuthUrl = speakeasy.otpauthURL({
    secret: secret.base32,
    label: 'test@test.com',
    issuer: 'Consens.us.org',
    encoding: 'base32',
  });

  /* eslint-disable */
  const qrcode: string = await new Promise((resolve, reject) =>
    toDataURL(otpAuthUrl, (e, u) => (e ? reject(e) : resolve(u))),
  );
  /* eslint-enable */

  const qr = {
    qrcode,
    secret: secret.base32,
  };

  ctx.session.qr = qr;
  return qr;
};
