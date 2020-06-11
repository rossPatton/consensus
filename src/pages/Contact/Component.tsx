import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';

import {Form} from '~app/components';

import {tComponentProps} from './_types';

export const ContactComponent = memo((props: tComponentProps) => (
  <Form
    className="animated fadeInUp"
    error={props.error}
    legend={(<h1 className="mb-2 font-semibold text-center">
      Contact us
    </h1>)}
    name="contactForm"
    onSubmit={props.sendEmail}
    renderFields={() => (
      <>
        <label htmlFor="feedbackType">
          <select
            name="type"
            id="feedbackType"
            className="mb-3 w-full"
            value={props.subject}
            onBlur={ev => props.updateState('subject', ev)}
            onChange={ev => props.updateState('subject', ev)}>
            <option value="Bug Report">
              Bug Report
            </option>
            <option value="Feature Idea">
              Feature Idea
            </option>
            <option value="Report a User or Group">
              Report a User or Group
            </option>
            <option value="General">
              General
            </option>
          </select>
        </label>
        <h3 className="text-base mb-1">
          What&apos;s up?
        </h3>
        <textarea
          rows={5}
          spellCheck
          maxLength={4096}
          className="mb-3 w-full"
          placeholder=""
          value={props.content}
          onChange={ev => props.updateState('content', ev)}
        />
        <h3 className="text-base mb-1">
          Your email
        </h3>
        <input
          type="email"
          className="mb-3 w-full"
          placeholder="email@example.com"
          value={props.email}
          onChange={ev => props.updateState('email', ev)}
        />
      </>
    )}
    renderSubmit={formProps => {
      const disabled = !formProps.hasMounted
        || !props.email
        || !props.content
        || !props.subject;

      return (
        <button
          disabled={disabled}
          className={cx({
            'p-2 pl-3 pr-3': true,
            'bg-green-1 hover:bg-green-2': !disabled,
          })}>
          Send Feedback
        </button>
      );
    }}
  />
));
