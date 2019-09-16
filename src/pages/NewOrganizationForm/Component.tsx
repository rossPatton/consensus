import _ from 'lodash';
import React, {memo} from 'react';

import {PasswordInput} from '../../components';
import {tComponentProps} from './_types';

export const NewOrganizationComponent = memo((props: tComponentProps) => {
  const { category: origCategory } = props;

  return (
    <div className="contain mT4">
      <h2 className="mB4">Create Your Organization</h2>
      <form
        id="form"
        className="row"
        onSubmit={props.onSubmit}>
        <fieldset>
          <small className="dBl mB2 copyBlack">
            The email and password will be used to log into your organization&apos;s admin account.
          </small>
          <div className="mB5">
            <h3>Organization Email</h3>
            <div className="mB3">
              <input
                required
                className="row"
                onChange={ev => props.updateState('email', ev)}
                placeholder="Your organization's email here"
                value={props.email}
              />
            </div>
            <PasswordInput
              required
              newPassword
              id="password"
              title="Organization Password"
              onChange={ev => props.updateState('password', ev)}
              placeholder="Your organization's password here"
              password={props.password as string}
            />
          </div>
          <h3>Organization Name</h3>
          <div className="mB4">
            <input
              required
              className="row"
              onChange={ev => props.updateState('name', ev)}
              placeholder="Your organization name here"
              value={props.name}
            />
          </div>
          <h3>Organization Category</h3>
          <input
            className="mB4 row"
            onChange={ev => props.updateState('category', ev)}
            placeholder="Your organization category here"
            value={props.category}
          />
          <h3>Organization Description</h3>
          <textarea
            rows={5}
            spellCheck
            className="mB4 row fs5"
            placeholder="Organization Description Here"
            value={props.description}
            onChange={ev => props.updateState('description', ev)}
          />
          <h3>
            Membership Vetting Process
          </h3>
          <select
            className="mB4 row"
            value={props.gate}
            onBlur={ev => props.updateState('gate', ev)}
            onChange={ev => props.updateState('gate', ev)}>
            <option value="manual">
              Manual, new members must be approved
            </option>
            <option value="public">
              Public, no vetting process at all
            </option>
            <option value="private">
              Private, invite only
            </option>
          </select>
          <h3>
            Event privacy defaults
          </h3>
          <select
            className="mB4 row"
            value={props.eventPrivacy}
            onBlur={ev => props.updateState('eventPrivacy', ev)}
            onChange={ev => props.updateState('eventPrivacy', ev)}>
            <option value="manual">
              Manual, event privacy can be changed per event
            </option>
            <option value="public">
              Public, all events are public
            </option>
            <option value="private">
              Private, all events are private
            </option>
          </select>
          <div className="brdT1 pT4 pB4 mT4 fx aiCtr">
            <button className="p3 pL4 pR4 hvrBgGrey1 trans1">
              Save
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
});
