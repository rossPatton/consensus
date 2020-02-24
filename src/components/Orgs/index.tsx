import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Paginate} from '../../containers';
import {deleteOrgByUserId} from '../../redux';
import {tContainerProps} from './_types';
import {OrgsComponent} from './Component';

class OrgsContainer extends PureComponent<tContainerProps> {
  state = {
    isHovering: false,
  };

  leaveOrg = (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => {
    ev.preventDefault();
    if (orgId) {
      this.props.deleteOrgByUserIdDispatch({orgId})
        .catch(loglevel.error);
    }
  }

  setHover = (isHovering: boolean = false) =>
    this.setState({
      isHovering,
    })

  render() {
    const {asList, count, isEditable, orgs, roles, showLocation} = this.props;
    if (!orgs || orgs instanceof Array && orgs.length === 0) {
      return null;
    }

    return (
      <Paginate
        items={orgs}
        count={count}
        render={(orgsToRender: tOrg[]) => (
          <OrgsComponent
            asList={asList}
            isEditable={isEditable}
            isHovering={this.state.isHovering}
            leaveOrg={this.leaveOrg}
            orgs={orgsToRender}
            roles={roles}
            setHover={this.setHover}
            showLocation={showLocation}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: {roles: tThunk<tRoleMap[]>}) => ({
  roles: store.roles.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  deleteOrgByUserIdDispatch: (query: tDeleteUserByOrgIdQuery) =>
    dispatch(deleteOrgByUserId(query)),
});

const Orgs = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrgsContainer);

export default Orgs;
