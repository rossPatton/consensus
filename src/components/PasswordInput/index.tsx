import React, { memo, useContext, useState } from 'react';

import {MediaContext} from '~app/context';

import {tProps} from './_types';
import {PasswordInputComponent} from './Component';

const PasswordInput = memo((props: tProps) => {
  const context = useContext(MediaContext);
  const [showPW, togglePWVisibility] = useState(false);

  return (
    <PasswordInputComponent
      {...context}
      errors={props.errors || {}}
      hideRequiredMessage={props.hideRequiredMessage}
      id={props.id}
      name={props.name || 'password'}
      newPassword={props.newPassword}
      onChange={props.onChange}
      password={props.password || ''}
      placeholder={props.placeholder}
      required={props.required}
      showPW={showPW}
      title={props.title}
      togglePWVisibility={togglePWVisibility}
    />
  );
});

export default PasswordInput;
