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
    <div className="p5">
      <h1 className="fs2 mT5 mB2">Your profile</h1>
      <form onSubmit={props.save}>
        <fieldset>
          <div>First Name:</div>
          <input
            autoComplete="off"
            onChange={props.updateFname}
            className="p1 mB1 brdA1"
            placeholder={origFname}
            value={props.fname}
          />
          <div>Last Name:</div>
          <input
            autoComplete="off"
            onChange={props.updateLname}
            className="p1 mB1 brdA1"
            placeholder={origLname}
            value={props.lname}
          />
          <div>Email address:</div>
          <input
            autoComplete="off"
            onChange={props.updateEmail}
            className="p1 mB1 brdA1 dInBl"
            placeholder={origEmail}
            value={props.email}
          />
          <div>Password:</div>
          <input
            autoComplete="off"
            onChange={props.updatePassword}
            className="p1 mB1 brdA1 dInBl"
            placeholder="Your new password here"
            value={props.password}
          />
          <div>Username:</div>
          <input
            autoComplete="off"
            onChange={props.updateUsername}
            className="p1 mB1 brdA1"
            placeholder={origUsername}
            value={props.username}
          />
        </fieldset>
        <button>Save Changes</button>
      </form>
    </div>
  );
});
