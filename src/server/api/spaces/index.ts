// digitalocean's spaces api is designed to be the same as s3 basically
// so we use the s3 sdk, but we aren't using s3 or amazon
import AWS from 'aws-sdk';
import Koa from 'koa';
import multer from 'koa-multer';
import Router from 'koa-router';
import _ from 'lodash';
import loglevel from 'loglevel';

import { validateSchema } from '../../utils';
import { schema } from './_schema';

// configure client for use with Spaces
const spacesEndpoint: unknown = new AWS.Endpoint('nyc3.digitaloceanspaces.com/meetings');
const s3 = new AWS.S3({
  // typing here is weird. aws endpoint above returns a AWS.Endpoint, which is a string
  // but this causes errors, so
  endpoint: spacesEndpoint as string,
  accessKeyId: __SPACES_KEY__,
  secretAccessKey: __SPACES_SECRET__,
});

const upload = multer();
export const spaces = new Router();

spaces.post(
  '/api/v1/spaces',
  upload.single('meetingFeaturedImage'),
  async (ctx: Koa.ParameterizedContext) => {
    const query = ctx?.state?.locals?.data;
    await validateSchema(ctx, schema, query);

    // let folder = '';
    // if (query.folder) {
    //   folder = query.folder;
    // }

    console.log('ctx.files => ', ctx.files);
    const { file }: { file: multer.File } = ctx.req as multer.MulterIncomingMessage;
    console.log('file => ', file);
    // ctx.body = {ok: true};

    const uploadParams = {
      Body: file.buffer,
      Bucket: 'consensus',
      Key: file.originalname,
      ACL: 'public-read',
    };

    s3.putObject(uploadParams, (err: Error | null, data: AWS.S3.PutObjectOutput) => {
      if (err) loglevel.error(err, err.stack);
      console.log(data);
      ctx.status = 200;
      ctx.body = {ok: true};
    });
  });

