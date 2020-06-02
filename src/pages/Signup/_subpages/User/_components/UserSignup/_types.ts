import {tKeyUnion, tState} from '../../_types';

export type tProps = tState & {
  verifyAndRegister: () => void,
  updateState: (key: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
