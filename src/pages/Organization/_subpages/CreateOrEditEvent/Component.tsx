import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from './_types';

export const CreateOrEditEventComponent = memo((props: tComponentProps) => {
  const {updateState} = props;
  const onChange = (ev: React.ChangeEvent<any>) => updateState(
    'duration',
    parseInt(ev.currentTarget.value, 10),
  );

  return (
    <form
      id="form"
      encType="multipart/form-data">
      <fieldset style={{maxWidth: '760px'}}>
        <legend className="mB3">
          <h2>
            {props.isDraft && 'Edit event'}
            {!props.isDraft && 'Create a new event'}
          </h2>
        </legend>
        <h3>Event Title</h3>
        <input
          className="mB4 row"
          placeholder="Your Event Title Here"
          value={props.title}
          onChange={ev => updateState('title', ev.currentTarget.value)}
        />
        <h3>Tell Us About Your Event</h3>
        <textarea
          rows={8}
          spellCheck
          className="mB4 row"
          placeholder="Event Description Here"
          value={props.description}
          onChange={ev => updateState('description', ev.currentTarget.value)}
        />
        {/* <h3>Featured Image</h3>
        {(props.imagePreview || props.pathToFeaturedImage) && (
          <div className="bgGrey1 p3 mB3 fx fxdCol aiCtr" id="imagePreview">
            <button
              // @ts-ignore
              onClick={ev => props.setImage(ev, true)}
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
              src={props.imagePreview || props.pathToFeaturedImage as string}
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
        */}
        <h3>Where is your event happening?</h3>
        <div className="fx mB4">
          <input
            results={3}
            spellCheck
            className="row mR3"
            placeholder="The name or address of the place here"
            value={props.location}
            onChange={ev => updateState('location', ev.currentTarget.value)}
          />
          <input
            type="url"
            className="row"
            placeholder="https://example.com"
            value={props.locationLink}
            onChange={ev => updateState('locationLink', ev.currentTarget.value)}
          />
        </div>
        <div className="fx mB4">
          <div className="mR3">
            <h3>When is the Event?</h3>
            <input
              type="date"
              min={dayJS().toISOString()}
              className="mR2"
              value={props.date}
              placeholder="Event Date Here"
              onChange={ev => updateState('date', ev.currentTarget.value)}
            />
            <input
              type="time"
              placeholder="Event Time Here"
              value={props.time}
              onChange={ev => updateState('time', ev.currentTarget.value)}
            />
          </div>
          <div>
            <h3>How long is it?</h3>
            <select
              value={props.duration}
              onBlur={onChange}
              onChange={onChange}>
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
              <option value="custom">Set an end time</option>
            </select>
          </div>
        </div>
        {props.org.eventPrivacy === 'manual' && (
          <>
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
          </>
        )}
        <div className="brdT1 pT4 pB4 mT4 fx aiCtr">
          <button
            onClick={props.onSubmit}
            className="p3 mR2 hvrBgGrey1 trans1">
            Publish
          </button>
          <button
            onClick={props.saveAsDraft}
            className="p3 mR2 hvrBgGrey1 trans1">
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
  );
});
