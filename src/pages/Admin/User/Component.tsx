import React, { memo } from 'react';
import { tComponentProps } from './_types';

export const UserAdminComponent = memo((props: tComponentProps) => {
  const {
    email: origEmail,
    fname: origFname,
    lname: origLname,
    username: origUsername,
  } = props.session;

  return (
    <form className="contain mT5 pT4 mB5" autoComplete="off" onSubmit={props.save}>
      <fieldset>
        <legend className="fs2 mB3 ffLab">
          Your profile
        </legend>
        <div className="mB1 fs6 fw600 lh1">
          First Name
        </div>
        <input
          onChange={ev => props.updateState('fname', ev)}
          className="p2 mB3 brdA1"
          placeholder={origFname}
          value={props.fname}
        />
        <div className="mB1 fs6 fw600 lh1">
          Last Name
        </div>
        <input
          onChange={ev => props.updateState('lname', ev)}
          className="p2 mB3 brdA1"
          placeholder={origLname}
          value={props.lname}
        />
        <div className="mB1 fs6 fw600 lh1">
          Email address
        </div>
        <input
          onChange={ev => props.updateState('email', ev)}
          className="p2 mB3 brdA1"
          placeholder={origEmail}
          value={props.email}
        />
        <div className="mB1 fs6 fw600 lh1">
          Username
        </div>
        <input
          onChange={ev => props.updateState('username', ev)}
          className="p2 brdA1 mB4"
          placeholder={origUsername}
          value={props.username}
        />
        <div className="mB1 fs6 fw600 lh1">
          Password
        </div>
        <input
          type="password"
          autoComplete="new-password"
          onChange={ev => props.updateState('newPassword', ev)}
          className="p2 mR2 mB3 brdA1"
          placeholder="Your new password"
          value={props.newPassword}
        />
        <div className="mB1 fs6 fw600 lh1">
          Current password, required to make any changes
        </div>
        <input
          required
          type="password"
          className="p2 brdA1 mB2"
          onChange={ev => props.updateState('password', ev)}
          placeholder="Your current password"
          value={props.password}
        />
      </fieldset>
      <button className="p3 pL4 pR4 hvrBgGrey1 trans1">
        Save Changes
      </button>
    </form>
  );
});
