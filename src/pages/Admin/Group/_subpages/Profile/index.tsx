import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {patchGroup} from '~app/redux';

import {tContainerProps, tKeyUnion, tState, tStore} from './_types';
import {ProfileComponent} from './Component';

class ProfileContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    const group = props?.sessionThunk?.data?.profile as ts.group;

    const {
      city,
      cityId,
      country,
      countryId,
      created_at,
      deletionDeadline,
      name,
      region,
      regionId,
      updated_at,
      ...editablePartOfGroup
    } = group;

    this.state = {
      ...editablePartOfGroup,
      error: '',
    };
  }

  onSubmit = async () => {
    try {
      await this.props.patchGroupDispatch({
        ...this.state,
        avatar: this.props.avatar,
        description: encodeURIComponent(this.state.description),
      });
    } catch (error) {
      return this.setState({
        error: error.message,
      });
    }

    window.location.reload();
  }

  updateState = (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => {
    if (!stateKey) return;

    const {value} = ev.currentTarget;

    this.setState({
      [stateKey]: value,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    const {match, sessionThunk} = this.props;
    const {subsection} = match?.params;

    return (
      <ProfileComponent
        {...this.props}
        {...this.state}
        onSubmit={this.onSubmit}
        session={sessionThunk.data}
        subsection={subsection}
        updateState={this.updateState}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => {
  const avatar = store.uploads?.data?.groupAvatar || '';
  return {
    avatar,
    sessionThunk: store.session,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  dispatch,
  patchGroupDispatch: (query: ts.groupUpsertQuery) => dispatch(patchGroup(query)),
});

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
export default Profile;
