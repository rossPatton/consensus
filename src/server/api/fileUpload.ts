import fs from 'fs-extra';
import {IncomingMessage} from 'http';
import Koa from 'koa';
import multer from 'koa-multer';
import Router from 'koa-router';
import mkdirp from 'mkdirp';
import path from 'path';
import qs from 'querystring';
import sharp from 'sharp';
import { Url } from 'url';

const CWD = process.cwd();

export const fileUpload = new Router();

// TODO move to declarations folder if we end up using in more places
type multerCB = (error: Error | null, destination: string) => void;
interface tReq extends multer.MulterIncomingMessage {
  _parsedUrl: Url,
}

const storage = multer.diskStorage({
  destination: (req: IncomingMessage, _: multer.File, cb: multerCB) => {
    const {_parsedUrl} = req as tReq;
    const {query = ''} = _parsedUrl;
    const {eventId} = qs.parse(query as string);
    const destination = `${CWD}/static/images/eventImages/${eventId}`;

    mkdirp(destination, (err: Error) => {
      if (err) throw err;
      cb(null, destination);
    });
  },
  filename: (_: IncomingMessage, file: multer.File, cb: Function) => {
    cb(null, `original${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// @ts-ignore
fileUpload.post(
  '/api/v1/fileUpload',
  upload.single('eventFeaturedImage'),
  async (ctx: Koa.ParameterizedContext<any>) => {
    const { file }: { file: multer.File } = ctx.req as multer.MulterIncomingMessage;
    const ext = path.extname(file.originalname);

    const resizer = sharp().resize(175, 175, {fit: 'contain'});
    // eslint-disable-next-line
    const writeStream = fs.createWriteStream(`${file.destination}/175x175${ext}`);

    // take original file, resize it, and then write it via streams
    // eslint-disable-next-line
    const readStream = fs.createReadStream(file.path)
      .pipe(resizer)
      .pipe(writeStream);

    readStream.on('finish', () => {
      ctx.status = 200;
      ctx.body = { success: true };
    });

    readStream.on('error', (err: Error) => {
      ctx.throw(400, err);
    });
  });
