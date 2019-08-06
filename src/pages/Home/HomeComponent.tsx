import React, { memo } from 'react';
import { tComponentProps } from './_types';

export const HomeComponent = memo((props: tComponentProps) => (
  <ol className="mT5 pT5">
    <li>buncha dumb users or whatever</li>
    {props.users && props.users.map((user, i) => (
      <li key={i}>
        <h3>{user.username}: {user.fname} {user.lname}</h3>
      </li>
    ))}
  </ol>
));
