import loglevel from 'loglevel';
import React from 'react';
import {connect} from 'react-redux';

import {deleteRoleSuccess, deleteUserByOrgId} from '../../../../redux';
import {tProps} from './_types';

class LeaveFormContainer extends React.PureComponent<tProps> {
  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const {dispatch, org, session} = this.props;
    const userId = session.profile.id;

    this.props.deleteUserByOrgIdDispatch({orgId: org.id, userId})
      .then(() => dispatch(deleteRoleSuccess({orgId: org.id, role: null})))
      .catch(loglevel.error);
  }

  render() {
    if (!this.props.role) return null;
    if (this.props.role === 'admin') return null;
    if (this.props.role === 'pending') return null;

    return (
      <form
        onSubmit={this.onSubmit}
        action="/api/v1/usersByOrg">
        <fieldset>
          <legend>
            <button className="bg-white text-sm rounded leading-none p-1 pl-2 pr-2">
              Leave Group
            </button>
          </legend>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (store: {session: tThunk<tSession>}) => ({
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  dispatch,
  deleteUserByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    dispatch(deleteUserByOrgId(query)),
});

const LeaveForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeaveFormContainer);

export default LeaveForm;
