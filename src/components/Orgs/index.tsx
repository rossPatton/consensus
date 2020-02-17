import React, {memo} from 'react';

import {Paginate} from '../../containers';
import {tProps} from './_types';
import {OrgsComponent} from './Component';

const OrgsContainer = memo((props: tProps) => {
  const {orgs, showLocation} = props;
  if (!orgs || orgs instanceof Array && orgs.length === 0) {
    return null;
  }

  return (
    <Paginate
      items={orgs}
      count={props.count}
      render={(orgsToRender: tOrg[]) => (
        <OrgsComponent
          orgs={orgsToRender}
          showLocation={showLocation}
        />
      )}
    />
  );
});

export default OrgsContainer;
