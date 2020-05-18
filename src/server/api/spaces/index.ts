import Koa from 'koa';
import multer from 'koa-multer';
import Router from 'koa-router';
import _ from 'lodash';
import loglevel from 'loglevel';

import { validateSchema } from '../../utils';
import { groupsS3, uploadDefaults, usersS3 } from './_constants';
// import { schema } from './_schema';
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
  console.log('query => ', query);
  // await validateSchema(ctx, schema, query);

  const req = ctx.req as multer.MulterIncomingMessage;
  const files = req.files as tFiles;
  console.log('ctx.files => ', files);

  if (typeof files === 'undefined') return ctx.throw(400);

  let file = null;
  let s3 = groupsS3;
  if (typeof files.meetingFeaturedImage !== 'undefined') {
    file = files.meetingFeaturedImage[0];
  } else if (typeof files.groupAvatar !== 'undefined') {
    file = files.groupAvatar[0];
  } else if (typeof files.userAvatar !== 'undefined') {
    file = files.userAvatar[0];
    s3 = usersS3;
  }

  // const spacesCB = (err: Error | null, data: AWS.S3.PutObjectOutput) => {
  //   if (err) loglevel.error(err, err.stack);
  //   console.log(data);
  //   ctx.status = 200;
  //   ctx.body = {ok: true};
  // };

  try {
    await s3.putObject({
      ...uploadDefaults,
      Body: file.buffer,
      Key: file.originalname,
    }).promise();
    ctx.status = 200;
    ctx.body = {img: file.originalname};
  } catch (err) {
    ctx.throw(500, err)
  }

  // s3Promise = usersS3.putObject({
  //     ...uploadDefaults,
  //     Body: file.buffer,
  //     Key: file.originalname,
  //   }, spacesCB).promise();

  // s3Promise = groupsS3.putObject({
  //   ...uploadDefaults,
  //   Body: file.buffer,
  //   Key: file.originalname,
  // }, spacesCB).promise();

  // await s3Promise;
});
