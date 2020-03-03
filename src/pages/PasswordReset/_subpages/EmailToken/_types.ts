import {tState, tStateUnion} from '../../_types';
export type tProps = tState & {
  sendPasswordResetEmail: (event: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
