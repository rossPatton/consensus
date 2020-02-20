import _ from 'lodash';
// import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

// import {Redirect} from 'react-router';
import {Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {login} from '../../redux';
import {api} from '../../utils';
import {canonical, description, keywords, title} from './_constants';
import {EmailTokenComponent, ResetPasswordComponent} from './_subpages';
import {tContainerProps, tState, tStateUnion, tStore} from './_types';

class PasswordResetContainer extends PureComponent<tContainerProps, tState> {
  state = {
    email: '',
    login: '',
    password: '',
    isClient: false,
  };

  componentDidMount() {
    // we do this so we only disable form submit when js is available
    this.setState({
      isClient: true,
    });
  }

  resetPasswordByEmail = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const token = _.get(this.props, 'match.params.token', null);
    api({
      method: 'PATCH',
      path: '/email/v1/resetPasswordByEmail',
      query: {
        login: this.state.login,
        password: this.state.password,
        token,
      },
    });
  }

  sendPasswordResetEmail = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    api({
      path: '/email/v1/emailResetToken',
      query: {email: this.state.email},
    });
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    const {match} = this.props;
    const token = _.get(match, 'params.token', null);

    return (
      <ErrorBoundary status={_.get(this.props, 'session.error.status', 200)}>
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
        {token && (
          <ResetPasswordComponent
            {...this.state}
            resetPasswordByEmail={this.resetPasswordByEmail}
            updateState={this.updateState}
          />
        )}
        {!token && (
          <EmailTokenComponent
            {...this.state}
            sendPasswordResetEmail={this.sendPasswordResetEmail}
            updateState={this.updateState}
          />
        )}
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  session: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: tLoginQuery) => dispatch(login(query)),
});

const PasswordReset =
  connect(mapStateToProps, mapDispatchToProps)(PasswordResetContainer);
export default PasswordReset;
