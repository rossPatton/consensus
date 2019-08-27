import React, { memo } from 'react';

import { PasswordInput } from '../../../components';
import { tComponentProps } from './_types';

export const UserAdminComponent = memo((props: tComponentProps) => {
  const {
    email: origEmail,
    fname: origFname,
    lname: origLname,
    username: origUsername,
  } = props.session;

  return (
    <form
      action="/api/v1/user"
      autoComplete="off"
      className="contain mT4 p5 pT4 pB4 mB2 br8 brdA1"
      onSubmit={props.save}>
      <fieldset>
        <legend>
          <h1 className="fs2 mB3">Edit your profile</h1>
        </legend>
        <input type="hidden" name="methodOverride" value="PATCH" />
        <label htmlFor="fname">
          <h2 className="ffLab fs5 mB1 lh1">
          First Name
          </h2>
          <input
            id="fname"
            onChange={ev => props.updateState('fname', ev)}
            className="p3 mB3 row"
            placeholder={origFname}
            value={props.fname}
            name="fname"
          />
        </label>
        <label htmlFor="lname">
          <h2 className="ffLab fs5 mB1 lh1">
            Last Name
          </h2>
          <input
            id="lname"
            onChange={ev => props.updateState('lname', ev)}
            className="p3 mB3 row"
            placeholder={origLname}
            value={props.lname}
            name="lname"
          />
        </label>
        <label htmlFor="email">
          <h2 className="ffLab fs5 mB1 lh1">
            Email address
          </h2>
          <input
            onChange={ev => props.updateState('email', ev)}
            className="p3 mB3 row"
            placeholder={origEmail}
            value={props.email}
            name="email"
          />
        </label>
        <label htmlFor="username">
          <h2 className="ffLab fs5 mB1 lh1">
          Username
          </h2>
          <input
            id="username"
            onChange={ev => props.updateState('username', ev)}
            className="p3 row mB3"
            placeholder={origUsername}
            value={props.username}
            name="username"
          />
        </label>
        <PasswordInput
          newPassword
          id="newPwInput"
          name="newPassword"
          password={props.newPassword}
          placeholder="Your new password"
          onChange={ev => props.updateState('newPassword', ev)}
        />
        <PasswordInput
          id="pwInput"
          title="Current password, required"
          password={props.password}
          placeholder="Your current password"
          onChange={ev => props.updateState('password', ev)}
        />
      </fieldset>
      <button className="p3 pL4 pR4 hvrBgGrey1 trans1">
        Save Changes
      </button>
    </form>
  );
});
