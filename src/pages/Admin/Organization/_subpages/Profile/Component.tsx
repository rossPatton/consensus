import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from './_types';

export const ProfileComponent = memo((props: tComponentProps) => {
  const {category: origCategory} = props;

  return (
    <>
      <h1 className="fs2 mB3">Manage Your Organization</h1>
      <form
        id="form"
        className="row"
        onSubmit={props.onSubmit}>
        <fieldset>
          <div className="p4 br8 brdA1 mB3">
            <h2 className="ffLab fs5 mB1 lh1">
              Organization Name
            </h2>
            <div className="mB3 copyBlack">
              <Link to={`/org/${props.id}`}>{props.name}</Link>
            </div>
            <h2 className="ffLab fs5 mB1 lh1">
              Organization Category
            </h2>
            <input
              className="mB3 row"
              onChange={ev => props.updateState('category', ev)}
              placeholder={origCategory}
              value={props.category}
            />
            <h2 className="ffLab fs5 mB1 lh1">
              Organization Description
            </h2>
            <textarea
              rows={6}
              spellCheck
              className="mB3 row fs5"
              placeholder="Organization Description Here"
              value={props.description}
              onChange={ev => props.updateState('description', ev)}
            />
            <h2 className="ffLab fs5 mB1 lh1">
              Group Type
            </h2>
            <select
              className="row"
              value={props.type}
              onBlur={ev => props.updateState('type', ev)}
              onChange={ev => props.updateState('type', ev)}>
              <option value="public">
                Public
              </option>
              <option value="private">
                Private
              </option>
              <option value="invite">
                Invite only
              </option>
            </select>
            <small className="dBl mB3 copyBlack">
              This option only affects future membership approvals
            </small>
            <div>
              {/* @TODO maybe have a mixed option here? */}
              {props.type === 'public' &&
                'Public. Anyone can join, with no vetting process at all. Meetings are public, visible to anyone.'}
              {props.type === 'private' &&
                'Private. Anyone can join, but members must be approved by a facilitator or admin first. Meetings are visible only to members.'}
              {props.type === 'invite' &&
                'Invite only. Members must be invited by the group owner or facilitator. Meetings are visible only to members. Group does not show in internal search results, and is hidden from search engines.'}
            </div>
            {/* <h2 className="ffLab fs5 mB1 lh1">
              Event privacy defaults
            </h2>
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
            <small className="dBl copyBlack">
              This option only affects future events
  </small>*/}
          </div>
          <button className="p3 pL4 pR4 hvrBgGrey1 trans1">
            Save Changes
          </button>
        </fieldset>
      </form>
    </>
  );
});
