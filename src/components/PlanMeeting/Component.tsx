import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {v1} from 'uuid';

import {Emoji} from '~app/components';
import {objToQueryString} from '~app/utils';
import {tComponentProps} from './_types';

export const PlanMeetingComponent = memo((props: tComponentProps) => {
  const {updateState} = props;
  const disableSubmit = !props.title || !props.date || !props.time;

  return (
    <div className="d:pb-2 d:pl-2 d:pr-2">
      {props.heading && (
        <h2 className="text-3 mb-2">
          {props.isDraft && 'Edit Meeting Draft'}
          {props.isCopy && 'Copy Meeting'}
          {!props.isCopy && !props.isDraft && 'Plan Meeting'}
        </h2>
      )}
      <form
        id="form"
        method="POST"
        encType="multipart/form-data">
        <fieldset>
          <h3 className="text-base mb-1">Meeting Title</h3>
          <input
            className="mb-3 w-full"
            placeholder="Your Meeting Title Here"
            value={props.title}
            onChange={ev => updateState('title', ev.currentTarget.value)}
          />
          <h3 className="text-base mb-1">
            Featured Image
          </h3>
          <div
            id="imagePreview"
            className={cx({
              "animated bg-gray-1 p-3 mb-3 flex flex-col": true,
              'fadeInDown': props.featuredImage,
              'hidden': !props.featuredImage,
            })}>
            <button
              type="button"
              onClick={props.removeImage}
              className="mb-1 p-2">
              <Emoji
                label="Close Emoji"
                emoji="✖️"
              />
              Remove Image
            </button>
            {props.featuredImage && (
              <img
                alt="Your uploaded image preview."
                className="w-full"
                height="175"
                width="175"
                src={`https://consensus.nyc3.digitaloceanspaces.com/meetings/${props.featuredImage}?v=${v1()}`}
              />
            )}
          </div>
          <label
            htmlFor="fileUpload"
            className={cx({
              "fadeInDown bg-gray-1 border cursor-ptr flex flex-col items-center mb-3 p-3 rounded animated": true,
              'fadeInDown': !props.featuredImage,
              'hidden': props.featuredImage,
            })}>
            <input
              id="fileUpload"
              className={cx({
                hidden: true,
              })}
              name="eventFeaturedImage"
              type="file"
              onChange={props.setImage}
              accept="image/png, image/jpeg, image/gif"
            />
            <span className="btn flex items-center mb-1 p-1">
              <Emoji
                label="Picture (Camera) Emoji"
                emoji="📷"
              />
              Upload Your Image
            </span>
            <small>We recommend a size of at least 760x428px</small>
          </label>
          <h3 className="text-base mb-1">Tell Us About Your Meeting</h3>
          <textarea
            rows={8}
            spellCheck
            className="mb-3 w-full"
            placeholder="Meeting Description Here. If meeting is online, past meeting details here as well."
            value={props.description}
            onChange={ev => updateState('description', ev.currentTarget.value)}
          />
          <div className="mb-3">
            <h3 className="text-base mb-1">Where is your meeting happening?</h3>
            <div
              tabIndex={0}
              role="button"
              className="flex d:flex-row items-center text-sm mb-1"
              onClick={() => props.updateState('isOnline', !props.isOnline)}
              onKeyPress={() => props.updateState('isOnline', !props.isOnline)}>
              <input
                readOnly
                type="checkbox"
                className="mr-2"
                autoComplete="nope"
                checked={props.isOnline}
              />
              <span>
                {props.isOnline && (
                  'Meeting is online. Put meeting details in your description.'
                )}
                {!props.isOnline && (
                  'Meeting is in person. Put location details below.'
                )}
              </span>
            </div>
            {!props.isOnline && (
              <div className="flex flex-col d:flex-row">
                <input
                  results={3}
                  spellCheck
                  className="w-full mb-1 d:mb-0 mr-2"
                  placeholder="Name of meeting place here"
                  value={props.location}
                  onChange={ev => updateState('location', ev.currentTarget.value)}
                />
                <input
                  type="url"
                  className="w-full"
                  placeholder="Google Maps link or other preferred map service here"
                  value={props.locationLink}
                  onChange={ev => updateState('locationLink', ev.currentTarget.value)}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col d:flex-row mb-2">
            <div className="mb-1 d:mb-0 d:mr-2">
              <h3 className="text-base mb-1">When&apos;s the meeting?</h3>
              <input
                type="date"
                min={dayJS().toISOString()}
                className="mr-1"
                value={dayJS(props.date).format('YYYY-MM-DD')}
                placeholder="Meeting Date Here"
                onChange={ev => updateState('date', ev.currentTarget.value)}
              />
            </div>
            <div>
              <h3 className="text-base mb-1">How long does it last?</h3>
              <input
                type="time"
                value={props.time}
                className="mr-2"
                placeholder="Start Time Here"
                onChange={ev => updateState('time', ev.currentTarget.value)}
              />
              <input
                type="time"
                value={props.endTime}
                placeholder="End Time Here"
                onChange={ev => updateState('endTime', ev.currentTarget.value)}
              />
            </div>
          </div>
          <div className="mb-3 d:mb-0 flex items-center">
            <button
              className="p-2 mr-1 hover:bg-gray-3"
              disabled={disableSubmit}
              onClick={ev => {
                ev.preventDefault();
                props.onSubmit();
              }}>
              Publish
            </button>
            <button
              className="p-2 mr-1 hover:bg-gray-3"
              disabled={disableSubmit}
              onClick={ev => {
                ev.preventDefault();
                props.saveAsDraft();
              }}>
              {props.meetingThunk.isLoading && 'Saving...'}
              {!props.meetingThunk.isLoading && 'Save as Draft'}
            </button>
            {typeof props.id === 'number' && (
              <Link
                to={`/draft/${props.id}?${objToQueryString(props)}`}
                className="btn p-2 text-sm hover:bg-gray-3">
                <span
                  role="img"
                  aria-label="Eye Emoji">
                  👁️
                </span>
                Preview
              </Link>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
});
