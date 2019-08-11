import React, { memo } from 'react';
import { getDateNowAsISOStr } from '../../../../utils';
import { tComponentProps } from './_types';

export const AdminEventComponent = memo((props: tComponentProps) => (
  <>
    <form onSubmit={props.publishEvent}>
      <fieldset style={{maxWidth: '760px'}}>
        <legend className="mB3">
          <h2>Create a new Event</h2>
        </legend>
        <h3>Event Title</h3>
        <input
          className="mB3 row"
          placeholder="Your Event Title Here"
          value={props.title}
          onChange={ev => props.updateState('title', ev)}
        />
        <h3>Tell Us About Your Event</h3>
        <textarea
          rows={5}
          spellCheck
          className="mB3 row"
          placeholder="Event Description Here"
          value={props.description}
          onChange={ev => props.updateState('description', ev)}
        />
        <h3>Featured Image</h3>
        <div
          className="br8 brdA1 bsDashed brdW3 mB3 p5 fx fxdCol aiCtr jcCtr"
          style={{maxWidth: '760px'}}>
          <button className="bgWhite p3 hvrBgGrey1 trans1 mB2">
            <span
              role="img"
              className="mR1"
              aria-label="Camera Emoji">
              📷
            </span>
            Upload Your Image
          </button>
          <small>At least 300x300</small>
        </div>
        <h3>Where is your event happening?</h3>
        <div className="fx mB3">
          <input
            results={3}
            spellCheck
            className="row mR3"
            placeholder="The name or address of the place here"
            value={props.location}
            onChange={ev => props.updateState('location', ev)}
          />
          <input
            results={3}
            spellCheck
            className="row"
            placeholder="If you have a link to a map - put here"
            value={props.locationLink}
            onChange={ev => props.updateState('locationLink', ev)}
          />
        </div>
        <div className="fx mB3">
          <div className="mR3">
            <h3>When is the Event?</h3>
            <input
              type="date"
              min={getDateNowAsISOStr()}
              className="mR2"
              value={props.date}
              placeholder="Event Date Here"
              onChange={ev => props.updateState('date', ev)}
            />
            <input
              type="time"
              placeholder="Event Time Here"
              value={props.time}
              onChange={ev => props.updateState('time', ev)}
            />
          </div>
          <div>
            <h3>How long is it?</h3>
            <select
              value={props.duration}
              onBlur={ev => props.updateState('duration', ev)}
              onChange={ev => props.updateState('duration', ev)}>
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
              <option value="custom">Set an end time</option>
            </select>
          </div>
        </div>
        <h3>Is this a private event?</h3>
        <div
          tabIndex={0}
          role="button"
          className="fx aiCtr curPtr dInBl"
          onClick={props.toggleChecked}
          onKeyPress={props.toggleChecked}>
          <input
            readOnly
            type="checkbox"
            className="mR2"
            autoComplete="nope"
            checked={props.isPrivate}
          />
          {props.isPrivate && (
            <span>Yes, only show this event to {props.org.orgName} members.</span>
          )}
          {!props.isPrivate && (
            <span>No, and I understand that anyone can see this event.</span>
          )}
        </div>
        <div className="brdT1 pT4 pB4 mT4 fx aiCtr">
          <button className="p3 mR2 hvrBgGrey1 trans1">
            + Publish Event
          </button>
          <button className="p3 mR2 hvrBgGrey1 trans1">
            Preview Event
          </button>
          <button className="p3 hvrBgGrey1 trans1">
            Save as Draft
          </button>
        </div>
      </fieldset>
    </form>
  </>
));
