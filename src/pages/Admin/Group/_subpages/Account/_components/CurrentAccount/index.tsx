import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from '../../_types';

const CurrentAccount = memo((props: tComponentProps) => (
  <>
    <h1 className="text-3 mb-2 leading-none">Your account details</h1>
    <h2 className="text-base mb-2 leading-none">
      Login: <span className="text-gray-4">
        {props.session.login}
      </span>
    </h2>
    <h2 className="text-base mb-2 leading-none">
      Password: <span className="text-gray-4">
        ******
      </span>
    </h2>
    <h2 className="text-base leading-none">
      Email address: <span className="text-gray-4">
        {props?.session?.emails?.[0]?.email || 'N/A'}
      </span>
    </h2>
    {typeof props?.session?.emails?.[0]?.email === 'string'
      && (
        <Link className="block mb-3" to="/verify-account">
          Verify this email
        </Link>
      )}
    <Link
      to="/admin/account/edit"
      className="btn p-2 pl-3 pr-3 hover:bg-gray-3">
      Edit account
    </Link>
  </>
));

export default CurrentAccount;
