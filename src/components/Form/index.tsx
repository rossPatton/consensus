import HCaptcha from '@hcaptcha/react-hcaptcha';
import cx from 'classnames';
import loglevel from 'loglevel';
import React, { ErrorInfo, PureComponent } from 'react';

import { tProps, tState } from './_types';

class FormContainer extends PureComponent<tProps, tState> {
  static defaultProps = {
    autoComplete: 'off',
    className: '',
    includeCaptcha: false,
  };

  state = {
    error: '',
    hasMounted: false,
    captcha: '',
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      error: error.message,
    }, () => loglevel.error(error, info));
    // TODO log to separate service, but only show user 500 page
  }

  componentDidMount() {
    // we do this so we only disable default form submit when js is available
    this.setState({
      hasMounted: true,
    });
  }

  handleVerificationSuccess = (captcha: string) => {
    this.setState({
      captcha,
    });
  }

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.props.onSubmit(this.state.captcha);
  }

  render() {
    const {error: errorProp, includeCaptcha, legend} = this.props;
    const {captcha, error: errorState, hasMounted} = this.state;
    let error = errorProp || errorState;

    // strip out status code if included
    if (typeof error === 'string' && error.includes(':')) {
      error = error.split(':')[1];
    }

    const validError = typeof error === 'string' && !!error;

    return (
      <form
        method="post"
        encType={this.props.encType}
        className={this.props.className}
        name={this.props.name}
        autoComplete={this.props.autoComplete}
        onSubmit={this.onSubmit}
      >
        <fieldset>
          <legend>
            {typeof legend === 'string'
              ? (
                <h1 className="mb-2">
                  {legend}
                </h1>
              )
              : legend}
          </legend>
          {this.props.renderFields({captcha, hasMounted})}
          <div
            className={cx({
              'mb-2': includeCaptcha || validError,
            })}>
            {includeCaptcha && (
              <div id="hcaptcha-wrapper" className="mb-2">
                <HCaptcha
                  sitekey={__HCAPTCHA_KEY__}
                  onVerify={this.handleVerificationSuccess}
                />
              </div>
            )}
            {this.props.renderSubmit({captcha, hasMounted})}
          </div>
          {validError && (
            <div className="rounded text-3 bg-red-2 p-2 text-white font-semibold w-full">
              {error}
            </div>
          )}
        </fieldset>
      </form>
    );
  }
}

export default FormContainer;
