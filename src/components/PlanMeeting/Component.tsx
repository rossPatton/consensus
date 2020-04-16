import {objToQueryString} from '@app/utils';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from './_types';

export const PlanMeetingComponent = memo((props: tComponentProps) => {
  const {updateState} = props;
  const onDurationChange = (ev: React.ChangeEvent<HTMLSelectElement>) =>
    updateState(
      'duration',
      parseInt(ev.currentTarget.value, 10),
    );

  const disableSubmit = !props.title
    || !props.date
    || !props.duration
    || !props.time;

  return (
    <div className="bg-white rounded p-2">
      {props.heading && (
        <h1 className="text-3 mb-2">
          {props.isDraft && 'Edit Meeting Draft'}
          {props.isCopy && 'Copy Meeting'}
          {!props.isCopy && !props.isDraft && 'Plan Meeting'}
        </h1>
      )}
      <form
        id="form"
        method="POST"
        encType="multipart/form-data">
        <fieldset>
          <h3 className="mb-1">Meeting Title</h3>
          <input
            className="mb-3 w-full"
            placeholder="Your Meeting Title Here"
            value={props.title}
            onChange={ev => updateState('title', ev.currentTarget.value)}
          />
          <h3 className="mb-1">Tell Us About Your Meeting</h3>
          <textarea
            rows={8}
            spellCheck
            className="mb-3 w-full"
            placeholder="Meeting Description Here"
            value={props.description}
            onChange={ev => updateState('description', ev.currentTarget.value)}
          />
          <h3 className="mb-1">Where is your meeting happening?</h3>
          <div className="flex flex-col d:flex-row mb-3">
            <input
              results={3}
              spellCheck
              className="w-full mb-1 d:mb-0 mr-2"
              placeholder="The name or address of the place"
              value={props.location}
              onChange={ev => updateState('location', ev.currentTarget.value)}
            />
            <input
              type="url"
              className="w-full"
              placeholder="https://example.com"
              value={props.locationLink}
              onChange={ev => updateState('locationLink', ev.currentTarget.value)}
            />
          </div>
          <div className="flex flex-col d:flex-row mb-3">
            <div className="mb-3 d:mb-0 mr-2">
              <h3 className="mb-1">When&apos;s the meeting?</h3>
              <input
                type="date"
                min={dayJS().toISOString()}
                className="mr-1"
                value={dayJS(props.date).format('YYYY-MM-DD')}
                placeholder="Meeting Date Here"
                onChange={ev => updateState('date', ev.currentTarget.value)}
              />
              <input
                type="time"
                value={props.time}
                placeholder="Meeting Time Here"
                onChange={ev => updateState('time', ev.currentTarget.value)}
              />
            </div>
            <div>
              <h3 className="mb-1">How long is it?</h3>
              <select
                value={props.duration}
                onBlur={onDurationChange}
                onChange={onDurationChange}>
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="custom">Set an end time</option>
              </select>
            </div>
          </div>
          <div className="flex items-center">
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
              Save as Draft
            </button>
            {!isNaN(props.id) && (
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
