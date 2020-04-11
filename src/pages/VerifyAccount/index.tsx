import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../components';
import {ErrorBoundary, Template} from '../../containers';
import {login} from '../../redux';
import {api} from '../../utils';
import {canonical, description, keywords, title} from './_constants';
import {EmailTokenComponent, VerifyTokenComponent} from './_subpages';
import {tContainerProps, tState, tStateUnion, tStore} from './_types';

class VerifyAccountContainer extends PureComponent<tContainerProps, tState> {
  state = {
    email: '',
    hasMounted: false,
    login: '',
    password: '',
    token: '',
  };

  componentDidMount() {
    // we do this so we only disable form submit when js is available
    this.setState({
      hasMounted: true,
    });
  }

  verifyToken = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    api({
      method: 'PATCH',
      path: '/email/v1/verifyEmail',
      query: {
        login: this.state.login,
        password: this.state.password,
        token: this.state.token,
      },
    })
      .then(() => {
        return this.props.loginDispatch({
          password: this.state.password,
          username: this.state.login,
        });
      })
      .then(res => {
        if (res.type === '@@auth/v1/LOGIN_SUCCESS') {
          this.setState({
            email: '',
            login: '',
            password: '',
            token: '',
          });
        }

        return null;
      })
      .catch(loglevel.error);
  }

  sendVerificationToken = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    api({
      path: '/email/v1/sendVerificationToken',
      query: {email: this.state.email},
    })
      .then(() => this.props.history.push('/verify-account/enterCode'))
      .catch(loglevel.error);
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    const {session} = this.props;
    const enterCode = _.get(this.props, 'match.params.section', null);

    return (
      <Template>
        <ErrorBoundary status={_.get(session, 'session.error.status', 200)}>
          <Helmet
            canonical={canonical}
            title={title}
            meta={[
              { name: 'description', content: description },
              { name: 'keywords', content: keywords },
              { property: 'og:title', content: title },
              { property: 'og:description', content: description },
            ]}
          />
          {session.data.isVerified && (
            <div className="w-full p-2 mb-2 text-center bg-green-1 font-bold text-sm">
            You&apos;re verified!
            </div>
          )}
          {enterCode && (
            <VerifyTokenComponent
              {...this.state}
              verifyToken={this.verifyToken}
              updateState={this.updateState}
            />
          )}
          {!enterCode && (
            <EmailTokenComponent
              {...this.state}
              sendVerificationToken={this.sendVerificationToken}
              updateState={this.updateState}
            />
          )}
        </ErrorBoundary>
      </Template>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  session: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: tLoginQuery) => dispatch(login(query)),
});

const VerifyAccount = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyAccountContainer);

export default VerifyAccount;
