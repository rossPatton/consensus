import { match } from 'react-router';

export type tProps = {
  match: match & { params: tDirectoryParams },
};
