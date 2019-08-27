import {ErrorInfo} from 'react';

export type tState = {
  error?: Error,
  hasError: boolean,
  info?: ErrorInfo,
};
