import React, {memo} from 'react';

import {tComponentProps} from '../../_types';

const CurrentAccount = memo((props: tComponentProps) => (
  <div className="rel">
    {props.session.isVerified && (
      <div className="fx aiCtr mB1 fs7 abs t r">
        <span className="mR1">✔</span>
        Verified Account
      </div>
    )}
    <h1 className="fs3 mB3">Your account details</h1>
    <h2 className="fs5 mB3 lh1">
      Login: <span className="copyBlack">
        {props.login}
      </span>
    </h2>
    <h2 className="fs5 mB3 lh1">
      Password: <span className="copyBlack">
        ******
      </span>
    </h2>
    {props.session.emails
      && props.session.emails.length > 0
      && (
        <h2 className="fs5 mB4 lh1">
          Email address: <span className="copyBlack">
            {props.session.emails[0].email}
          </span>
        </h2>
      )}
    <button
      className="p3 pL4 pR4 hvrBgGrey1 trans1"
      onClick={props.toggleLock}>
      Change your login, password or email
    </button>
  </div>
));

export default CurrentAccount;
