import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {getDateNowAsISOStr} from '../../../../utils';
import {tComponentProps} from './_types';

export const AdminEventComponent = memo((props: tComponentProps) => (
  <form
    id="form"
    encType="multipart/form-data">
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
      {props.imagePreview && (
        <div className="bgGrey1 p3 mB3 fx fxdCol aiCtr" id="imagePreview">
          <button
            onClick={() => props.setImage(null)}
            className="bgWhite mB2 p2 pL3 pR3">
            <span
              role="img"
              className="mR1"
              aria-label="X Emoji">
              ✖️
            </span>
            Remove Image
          </button>
          <img
            alt=""
            className="row"
            height="175"
            width="175"
            src={props.imagePreview}
          />
        </div>
      )}
      <label
        htmlFor="fileUpload"
        className={cx({
          'rel fx fxdCol aiCtr jcCtr br8 brdA1 bsDashed brdW3 mB3 p5 curPtr': true,
          'hide': props.imagePreview,
        })}>
        <input
          id="fileUpload"
          name="eventFeaturedImage"
          type="file"
          onChange={props.setImage}
          accept="image/png, image/jpeg, image/gif"
        />
        <span className="btn fx aiCtr p3 hvrBgGrey1">
          <span
            role="img"
            className="mR1"
            aria-label="Camera Emoji">
            📷
          </span>
          Upload Your Image
        </span>
        <small>We recommend a size of at least 760x428px</small>
      </label>
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
          type="url"
          className="row"
          placeholder="https://example.com"
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
          <span>Yes, only show this event to {props.org.name} members.</span>
        )}
        {!props.isPrivate && (
          <span>No, and I understand that anyone can see this event.</span>
        )}
      </div>
      <div className="brdT1 pT4 pB4 mT4 fx aiCtr">
        <button onClick={props.onSubmit} className="p3 mR2 hvrBgGrey1 trans1">
          Publish
        </button>
        <button onClick={props.saveAsDraft} className="p3 mR2 hvrBgGrey1 trans1">
          Save as Draft
        </button>
        {/* TODO only show after saving as draft*/}
        {props.id && (
          <Link
            to={`/event/${props.id}?isPreview=true`}
            className="brdA1 br4 lh1 p3 fs6 hvrBgGrey1 trans1">
            Preview
          </Link>
        )}
      </div>
    </fieldset>
  </form>
));
