import {tState, tStateUnion} from '../../_types';

export type tProps = tState & {
  sendVerificationToken: (event: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
