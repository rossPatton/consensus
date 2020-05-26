import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Emoji} from '~app/components';

import {tComponentProps} from '../../_types';

const CurrentAccount = memo((props: tComponentProps) => (
  <>
    <h2 className="text-3 mb-2 leading-none">Your account details</h2>
    <h3 className="text-base mb-2 leading-none font-bold">
      <span className="font-semibold">Login:</span> <span className="text-gray-5">
        {props.session.login}
      </span>
    </h3>
    <h3 className="text-base mb-2 leading-none font-bold">
      <span className="font-semibold">Password:</span> <span className="text-gray-5">
        ******
      </span>
    </h3>
    <h3 className="text-base leading-none font-bold">
      <span className="font-semibold">Email address:</span> <span className="text-gray-5">
        {props?.session?.email}
      </span>
    </h3>
    {!props.session.isVerified
      && (
        <Link className="block mb-3" to="/verify-email">
          Verify this email
        </Link>
      )}
    {props.session.isVerified
      && (
        <Emoji
          label="Verified Email Checkbox"
          emoji="✅"
        />
      )}
    <Link
      to="/admin/account/edit"
      className="btn inline-block p-2 pl-3 pr-3 hover:bg-gray-3">
      Edit account
    </Link>
  </>
));

export default CurrentAccount;
