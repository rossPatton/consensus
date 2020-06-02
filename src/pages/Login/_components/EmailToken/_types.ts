import {tKeyUnion, tState} from '../../_types';

export type tProps = tState & {
  sendToken: () => void,
  updateState: (key: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
