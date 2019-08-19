import React, { memo } from 'react';
import { PasswordInput } from '../../components';
import { tComponentProps } from './_types';

export const SignupComponent = memo((props: tComponentProps) => (
  <form
    className="contain p5 bgGrey1 br8"
    autoComplete="off"
    onSubmit={props.register}>
    <legend className="mB3 ffCooper fs2">
      Create an account
    </legend>
    <fieldset>
      <h2 className="ffLab fs5 mB1 lh1">Email</h2>
      <input
        required
        className="p3 mB3 row"
        placeholder="example@youraddress.com"
        value={props.email}
        onChange={ev => props.updateState('email', ev)}
      />
      <h2 className="ffLab fs5 mB1 lh1">Username</h2>
      <input
        required
        className="p3 mB3 row"
        placeholder="theNameOtherUsersWillSee"
        value={props.username}
        onChange={ev => props.updateState('username', ev)}
      />
      <div className="mB4">
        <h2 className="ffLab fs5 mB1 lh1">Password</h2>
        <PasswordInput
          required
          autoComplete="new-password"
          error={props.error}
          password={props.password}
          placeholder="correct_horse_battery_staple_is_a_good_secure_passphrase"
          showPW={props.showPW}
          togglePWVisibility={props.togglePWVisibility}
          updateState={props.updateState}
        />
      </div>
      <button className="bgWhite mB2 p3 pL4 pR4">
        Sign up
      </button>
      <div className="fs6">
        By signing up, you agree to our Terms and that you have read our Privacy Policy and Content Policy.
      </div>
    </fieldset>
  </form>
));
