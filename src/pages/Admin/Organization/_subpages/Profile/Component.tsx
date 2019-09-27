import _ from 'lodash';
import React, {memo} from 'react';

import {tComponentProps} from './_types';

export const ProfileComponent = memo((props: tComponentProps) => {
  const {category: origCategory} = props;

  return (
    <>
      <h2 className="mB4">Manage Your Organization</h2>
      <form
        id="form"
        className="row"
        onSubmit={props.onSubmit}>
        <fieldset>
          <h3>Organization Name</h3>
          <div className="mB4">
            {props.name}
          </div>
          <h3>Organization Category</h3>
          <input
            className="mB4 row"
            onChange={ev => props.updateState('category', ev)}
            placeholder={origCategory}
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
            className="row"
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
              Private, direct invite only
            </option>
          </select>
          <small className="dBl mB4 copyBlack">
            This option only affects future membership approvals
          </small>
          <h3>
            Event privacy defaults
          </h3>
          <select
            className="row"
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
          <small className="dBl mB4 copyBlack">
            This option only affects future events
          </small>
          <div className="brdT1 pT4 pB4 mT4 fx aiCtr">
            <button className="p3 pL4 pR4 hvrBgGrey1 trans1">
              Save
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
});
