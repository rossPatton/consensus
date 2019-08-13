import Koa from 'koa';
import Router from 'koa-router';
import multer from 'koa-multer';

const CWD = process.cwd();
export const fileUpload = new Router();
const storage = multer.diskStorage({
  destination: `${CWD}/static/images`,
  filename: (_, file, cb) => {
    console.log('file ? ', file);
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage });

// @ts-ignore
fileUpload.post(
  '/api/v1/fileUpload',
  upload.single('featuredImage'),
  async (ctx: Koa.ParameterizedContext<any>) => {
    console.log('ctx.req.files => ', ctx.req.files);
    console.log('ctx.request.files => ', ctx.request.files);
    console.log('ctx.req.body => ', ctx.req.body);
    ctx.status = 200;
    ctx.body = { success: true };
  });

// router.post('/upload', upload.single('document'), async ctx => {
//   const { file } = ctx.req;

//   // Do stuff with the file here

//   ctx.status = 200;
// });
