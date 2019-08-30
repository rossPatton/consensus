import React from 'react';

import {JoinFormComponent} from './Component';

export class JoinForm extends React.PureComponent<any> {
  state = {
    didSubmit: false,
    error: {},
  };

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const {session} = this.props;

    fetch('/api/v1/usersByOrg', {
      body: `${session.id}`,
      method: 'POST',
    })
      .then(console.log)
      .catch(console.error);
  }

  render() {
    const {org, role} = this.props;

    console.log('role => ', role);

    if (org.gate === 'public') return null;

    if (role) {
      return (
        <span className="bgWhite brdA1 br8 p1 pL2 pR2 mR2 fx aiCtr">
          <span className="fs4 mR1">✔</span>
          <span className="ttCap">{role}</span>
        </span>
      );
    }

    return (
      <JoinFormComponent onSubmit={this.onSubmit} />
    );
  }
}
