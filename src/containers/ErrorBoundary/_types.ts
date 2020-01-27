import {ErrorInfo} from 'react';

export type tInfoUnion = ErrorInfo | string | null
export type tStatusUnion = 200 | 204 | 400 | 404 | 500;

export type tProps = {
  error?: any,
  status: tStatusUnion,
}

export type tState = tProps & {
  info: tInfoUnion | null,
};
