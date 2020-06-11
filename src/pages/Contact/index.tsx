import _ from 'lodash';
import React, {PureComponent} from 'react';

import {Helmet} from '~app/components';
import {ErrorBoundary, Template} from '~app/containers';
import {api} from '~app/utils';

import {canonical, description, keywords, title} from './_constants';
import {tKeyUnion, tState} from './_types';
import {ContactComponent} from './Component';

class ContactContainer extends PureComponent<any, tState> {
  state = {
    content: '',
    email: '',
    emailSent: false,
    subject: 'Bug Report',
    error: '',
  };

  // if user logs in with no OTP enabled, just log them in
  // otherwise, it kicks them to the 2FA screen
  // if that code is correct, then log them in
  sendEmail = async () => {
    const {content, email, subject} = this.state;

    try {
      await api({
        path: '/api/v1/sendEmail',
        query: {content, email, subject},
      });
      this.setState({
        emailSent: true,
      });
    } catch (error) {
      return this.setState({
        error: error.message,
      });
    }
  }

  updateState = (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    return (
      <Template className="bg-community m-auto min-h-halfscreen pb-5 pt-4">
        <ErrorBoundary>
          <Helmet
            canonical={canonical}
            title={title}
            meta={[
              { name: 'description', content: description },
              { name: 'keywords', content: keywords },
            ]}
          />
          <div className="bg-white rounded-tr rounded-bl rounded-br shadow m-auto contain-sm mb-3 p-2 d:p-3">
            {this.state.emailSent && (
              <h1 className="mb-2 font-semibold text-center">
                Thanks for your feedback! We&apos;ll respond as soon as we can.
              </h1>
            )}
            {!this.state.emailSent && (
              <ContactComponent
                {...this.state}
                sendEmail={this.sendEmail}
                updateState={this.updateState}
              />
            )}
          </div>
        </ErrorBoundary>
      </Template>
    );
  }
}

export default ContactContainer;
