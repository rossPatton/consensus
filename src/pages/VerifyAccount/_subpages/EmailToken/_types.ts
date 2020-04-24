import {tState, tStateUnion} from '../../_types';

export type tProps = tState & {
  sendVerificationToken: (meeting: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
