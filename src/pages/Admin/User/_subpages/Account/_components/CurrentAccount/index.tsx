import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Emoji} from '~app/components';

import {tComponentProps} from '../../_types';

const CurrentAccount = memo((props: tComponentProps) => (
  <>
    <h2 className="text-3 mb-2 leading-none font-bold">
      Your account details
    </h2>
    <h3 className="text-base mb-2 leading-none font-bold">
      Login: <span className="text-gray-5">
        {props.session.login}
      </span>
    </h3>
    <h3 className="text-base mb-2 leading-none font-bold">
      Password: <span className="text-gray-5">
        ************
      </span>
    </h3>
    <h3 className="text-base mb-3 leading-none font-bold">
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
    </h3>
    <Link
      to="/admin/account/edit"
      className="btn inline-block p-2 pl-3 pr-3 hover:bg-gray-3">
      Edit account
    </Link>
  </>
));

export default CurrentAccount;
