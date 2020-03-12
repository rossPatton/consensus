import React, {memo} from 'react';

import {tComponentProps} from '../../_types';

const CurrentAccount = memo((props: tComponentProps) => (
  <>
    <h1 className="fs3 mB3 lh1">Your account details</h1>
    <h2 className="fs5 mB3 lh1">
      Login: <span className="copyBlack">
        {props.session.login}
      </span>
    </h2>
    <h2 className="fs5 mB3 lh1">
      Password: <span className="copyBlack">
        ************
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
      Edit account
    </button>
  </>
));

export default CurrentAccount;
