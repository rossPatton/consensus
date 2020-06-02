import {tKeyUnion, tState} from '../../_types';

export type tProps = tState & {
  verifyAndLogin: () => void,
  updateState: (key: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
