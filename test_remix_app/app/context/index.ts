import loadable from '@loadable/component';

export {MediaContext} from './MatchMediaProvider/_context';
export const MatchMediaProvider = loadable(() =>
  import(/* webpackChunkName: "MatchMediaProvider" */'./MatchMediaProvider'),
);
