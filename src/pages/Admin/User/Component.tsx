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
      method="PATCH"
      action="/api/v1/user"
      autoComplete="off"
      className="contain mT4 p5 pT4 pB4 mB2 br8 brdA1"
      onSubmit={props.save}>
      <fieldset>
        <legend>
          <h1 className="fs2 mB3">Your profile</h1>
        </legend>
        <h2 className="ffLab fs5 mB1 lh1">
          First Name
        </h2>
        <input
          onChange={ev => props.updateState('fname', ev)}
          className="p3 mB3 row"
          placeholder={origFname}
          value={props.fname}
          name="fname"
        />
        <h2 className="ffLab fs5 mB1 lh1">
          Last Name
        </h2>
        <input
          onChange={ev => props.updateState('lname', ev)}
          className="p3 mB3 row"
          placeholder={origLname}
          value={props.lname}
          name="lname"
        />
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
        <h2 className="ffLab fs5 mB1 lh1">
          Username
        </h2>
        <input
          onChange={ev => props.updateState('username', ev)}
          className="p3 row mB3"
          placeholder={origUsername}
          value={props.username}
          name="username"
        />
        <PasswordInput
          newPassword
          id="newPwInput"
          name="newPassword"
          password={props.newPassword}
          placeholder="Your1new2very3secure4password!"
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            return props.updateState('newPassword', ev);
          }}
        />
        <PasswordInput
          id="pwInput"
          title="Current password, required"
          password={props.password}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            return props.updateState('password', ev);
          }}
        />
      </fieldset>
      <button
        disabled={props.password.length === 0}
        className="p3 pL4 pR4 hvrBgGrey1 trans1">
        Save Changes
      </button>
    </form>
  );
});
