import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Emoji} from '~app/components';

import {tComponentProps} from '../../_types';

const CurrentAccount = memo((props: tComponentProps) => (
  <>
    <h1 className="text-3 mb-2 leading-none">
      Your account details
    </h1>
    <h2 className="text-base mb-2 leading-none">
      Login: <span className="text-gray-5">
        {props.session.login}
      </span>
    </h2>
    <h2 className="text-base mb-2 leading-none">
      Password: <span className="text-gray-5">
        ************
      </span>
    </h2>
    <h2 className="text-base mb-3 leading-none">
      Email: <span className="text-gray-5 mr-1">
        {props.session.email}
      </span>
      {!props.session.isVerified && (
        <Link to="/verify-email">
          Verify email
        </Link>
      )}
      {props.session.isVerified && (
        <Emoji
          label="Verified Email Checkbox"
          emoji="✅"
        />
      )}
    </h2>
    <Link
      to="/admin/account/edit"
      className="btn p-2 pl-3 pr-3 hover:bg-gray-3 transition">
      Edit account
    </Link>
  </>
));

export default CurrentAccount;
