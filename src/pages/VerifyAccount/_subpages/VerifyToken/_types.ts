import {tState, tStateUnion} from '../../_types';

export type tProps = tState & {
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
  verifyToken: (event: React.FormEvent<HTMLFormElement>) => void,
}
