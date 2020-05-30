import HCaptcha from '@hcaptcha/react-hcaptcha';
import React, { PureComponent } from 'react';

import { tProps, tState } from './_types';

class FormContainer extends PureComponent<tProps, tState> {
  static defaultProps = {
    autoComplete: 'off',
    className: '',
  };

  state = {
    hasMounted: false,
    token: '',
  };

  componentDidMount() {
    // we do this so we only disable default form submit when js is available
    this.setState({
      hasMounted: true,
    });
  }

  handleVerificationSuccess = (token: string) => {
    this.setState({
      token,
    });
  }

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.props.onSubmit(this.state.token);
  }

  render() {
    let {error} = this.props;
    const {legend} = this.props;

    // strip out status code if included
    if (typeof error === 'string' && error.includes(':')) {
      error = error.split(':')[1];
    }

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
          {this.props.renderFields(this.state)}
          {this.props.captcha && (
            <div className="mb-2">
              <HCaptcha
                sitekey={__HCAPTCHA_KEY__}
                onVerify={this.handleVerificationSuccess}
              />
            </div>
          )}
          {this.props.renderSubmit(this.state)}
          {error && (
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
