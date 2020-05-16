import _ from 'lodash';
import Koa from 'koa';
import loglevel from 'loglevel';
import multer from 'koa-multer';
import Router from 'koa-router';

import { groupsS3, usersS3, uploadDefaults } from './_constants';
import { validateSchema } from '../../utils';
import { schema } from './_schema';
import { tFiles } from './_types';

const upload = multer();
export const spaces = new Router();

// fields === all the various file upload types we have, with upload limits
const fields = upload.fields([{
  name: 'groupAvatar',
  maxCount: 1,
}, {
  name: 'userAvatar',
  maxCount: 1,
}, {
  name: 'meetingFeaturedImage',
  maxCount: 1,
}]);

spaces.post('/api/v1/spaces', fields, async (ctx: Koa.ParameterizedContext) => {
    const query = ctx?.state?.locals?.data;
    await validateSchema(ctx, schema, query);

    const req = ctx.req as multer.MulterIncomingMessage;
    const files = req.files as tFiles;
    console.log('ctx.files => ', files);

    if (typeof files === 'undefined') return ctx.throw(400);

    const spacesCB = (err: Error | null, data: AWS.S3.PutObjectOutput) => {
      if (err) loglevel.error(err, err.stack);
      console.log(data);
      ctx.status = 200;
      ctx.body = {ok: true};
    };

    if (typeof files['meetingFeaturedImage'] !== 'undefined') {
      const file = files['meetingFeaturedImage'][0];
      groupsS3.putObject({
        ...uploadDefaults,
        Body: file.buffer,
        Key: file.originalname,
      }, spacesCB);

    } else if (typeof files['groupAvatar'] !== 'undefined') {
      const file = files['groupAvatar'][0];
      groupsS3.putObject({
        ...uploadDefaults,
        Body: file.buffer,
        Key: file.originalname,
      }, spacesCB);

    } else if (typeof files['userAvatar'] !== 'undefined') {
      const file = files['userAvatar'][0];
      usersS3.putObject({
        ...uploadDefaults,
        Body: file.buffer,
        Key: file.originalname,
      }, spacesCB);
    }
  });
