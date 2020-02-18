import React, {memo} from 'react';
import {connect} from 'react-redux';

import {Paginate} from '../../containers';
import {tProps} from './_types';
import {OrgsComponent} from './Component';

const OrgsContainer = memo((props: tProps) => {
  const {asList, isEditable, orgs, roles, showLocation} = props;
  if (!orgs || orgs instanceof Array && orgs.length === 0) {
    return null;
  }

  return (
    <Paginate
      items={orgs}
      count={props.count}
      render={(orgsToRender: tOrg[]) => (
        <OrgsComponent
          asList={asList}
          isEditable={isEditable}
          orgs={orgsToRender}
          roles={roles}
          showLocation={showLocation}
        />
      )}
    />
  );
});

const mapStateToProps = (store: {roles: tThunk<tRoleMap[]>}) => ({
  roles: store.roles.data,
});

const Orgs = connect(
  mapStateToProps,
  null,
)(OrgsContainer);

export default Orgs;
