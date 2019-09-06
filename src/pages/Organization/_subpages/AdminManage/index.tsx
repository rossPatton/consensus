import dayJS from 'dayjs';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';

import { Helmet } from '../../../../components';
import { createEvent } from '../../../../redux';
import { getEventsSuccess } from '../../../../redux/async/events/actions';
import { tContainerProps, tStateUnion, tStore } from './_types';
import { AdminManageComponent } from './Component';

export class AdminManageContainer extends Component<tContainerProps, tOrg> {
  state = {
    ...this.props.org,
  };

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tOrg, tStateUnion>);
  }

  render() {
    const {session} = this.props;

    return (
      <>
        <Helmet
          canonical=""
          title=""
          meta={[
            { name: 'description', content: '' },
            { name: 'keywords', content: '' },
            { property: 'og:title', content: '' },
            { property: 'og:description', content: '' },
          ]}
        />
        {!session.isAuthenticated && <Redirect to="" />}
        {session.isAuthenticated && (
          <AdminManageComponent
            {...this.props}
            {...this.state}
            onSubmit={this.onSubmit}
            // setImage={this.setImage}
            // toggleChecked={this.toggleChecked}
            updateState={this.updateState}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  session: store.session.data,
});

// const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
//   updateOrg: (event: any) => dispatch(updateOrg(event)),
// });

export const AdminManage = connect(
  mapStateToProps,
  // mapDispatchToProps
)(AdminManageContainer);
