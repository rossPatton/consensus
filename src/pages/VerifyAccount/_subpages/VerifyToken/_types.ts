import {tState, tStateUnion} from '../../_types';

export type tProps = tState & {
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
  verifyToken: (meeting: React.FormEvent<HTMLFormElement>) => void,
}
