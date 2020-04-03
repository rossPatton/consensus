import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from '../../_types';

const CurrentAccount = memo((props: tComponentProps) => (
  <>
    <h1 className="fs3 mb-3 leading-none">Your account details</h1>
    <h2 className="fs5 mb-3 leading-none">
      Login: <span className="copyBlack">
        {props.session.login}
      </span>
    </h2>
    <h2 className="fs5 mb-3 leading-none">
      Password: <span className="copyBlack">
        ******
      </span>
    </h2>
    {props.session.emails
      && props.session.emails.length > 0
      && (
        <h2 className="fs5 mb-1 leading-none">
          Email address: <span className="copyBlack">
            {props.session.emails[0].email}
          </span>
        </h2>
      )}
    <Link className="dInBl mb-4" to="/verify-account">
      Verify this email
    </Link>
    <Link
      to="/admin/account/edit"
      className="btn p-3 pl-4 pR4 hover:bg-gray-11 trans1">
      Edit account
    </Link>
  </>
));

export default CurrentAccount;
