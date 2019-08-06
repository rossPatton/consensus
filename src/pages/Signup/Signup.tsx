import React, { memo } from 'react';
import { Helmet } from '../../components';
import { canonical, description, keywords, title } from './_constants';
import { tComponentProps } from './_types';

export const SignupComponent = memo((props: tComponentProps) => (
  <>
    <Helmet
      canonical={canonical}
      title={title}
      meta={[
        { name: 'description', content: description },
        { name: 'keywords', content: keywords },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ]}
    />
    <form className="pT5 mT5" onSubmit={props.register}>
      <fieldset>
        <div>
          <input
            autoComplete="off"
            className="p1 brdA1 dBl mB1"
            placeholder="Email here"
            value={props.email}
            onChange={props.updateEmail}
          />
          <input
            autoComplete="off"
            className="p1 brdA1 dBl mB1"
            type="password" placeholder="Password here"
            value={props.password}
            onChange={props.updatePassword}
          />
          <input
            autoComplete="off"
            className="p1 brdA1 dBl mB1"
            placeholder="Username here"
            value={props.username}
            onChange={props.updateUsername}
          />
          <input
            autoComplete="off"
            className="p1 brdA1 dBl mB1"
            placeholder="First name"
            value={props.fname}
            onChange={props.updateFname}
          />
          <input
            autoComplete="off"
            className="p1 brdA1 dBl"
            placeholder="Last name"
            value={props.lname}
            onChange={props.updateLname}
          />
        </div>
        <button>Sign up</button>
      </fieldset>
    </form>
  </>
));
