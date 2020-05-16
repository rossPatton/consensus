import multer from 'koa-multer';

export type tFiles = {
  [fieldname: string]: multer.File[];
};
