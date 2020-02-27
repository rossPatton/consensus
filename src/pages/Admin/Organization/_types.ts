import {Location} from 'history';

import {tAdminSections} from '../_types';

export type tProps = {
  location: Location,
  match: tAdminSections,
  session: tSession<tOrg>,
};
