import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {login, postGroup} from '~app/redux';

import {tContainerProps, tState, tStateUnion} from './_types';
import {GroupSignupComponent} from './Component';

export class GroupSignupContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    this.state = {
      category: 'Political',
      city: '',
      cityId: 0,
      email: '',
      handle: '',
      hasMounted: false,
      login: '',
      name: '',
      password: '',
      region: '',
      regionId: 0,
      showRegionField: false,
      type: 'public' as ts.privacyEnum,
    };
  }

  componentDidMount() {
    // we do this so we only disable form submit when js is available
    this.setState({
      hasMounted: true,
    });
  }

  onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {hasMounted, showRegionField, ...newGroup} = this.state;
    await this.props.postGroupDispatch(newGroup);
    await this.props.loginDispatch({
      username: newGroup.login,
      password: newGroup.password,
    });
  }

  updateState = (stateKey: tStateUnion, value: string | number | object | boolean) => {
    // if making multiple changes at once, don't update at end
    if (typeof value === 'object') {
      return this.setState(value);
    }

    this.setState({
      [stateKey]: value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    const {
      category,
      city,
      cityId,
      email,
      handle,
      login,
      name,
      password,
      region,
      regionId,
      type,
    } = this.state;

    const disabled = !category
      || !city
      || !cityId
      || !email
      || !handle
      || handle.length < 3
      || !login
      || !name
      || !password
      || password.length < 12
      || !region
      || !regionId
      || !type;

    return (
      <>
        <Helmet
          canonical="/signup/newGroup"
          title="Start a new group on Consensus"
          meta={[
            { name: 'description', content: 'Fill our our signup form to start engaging with your membership today!' },
            { name: 'keywords', content: 'group,signup' },
          ]}
        />
        <GroupSignupComponent
          {...this.props}
          {...this.state}
          disabled={disabled}
          onSubmit={this.onSubmit}
          updateState={this.updateState}
        />
      </>
    );
  }
}

const mapStateToProps = (store: {geo: ts.thunk<ts.geo>}) => ({
  geo: store.geo.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: ts.loginQuery) => dispatch(login(query)),
  postGroupDispatch: (group: ts.groupQuery) => dispatch(postGroup(group)),
});

export const GroupSignup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupSignupContainer);
