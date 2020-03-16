import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {objToQueryString} from '../../utils';
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
    <form
      id="form"
      method="POST"
      encType="multipart/form-data">
      <fieldset>
        <h3>Meeting Title</h3>
        <input
          className="mB4 row"
          placeholder="Your Meeting Title Here"
          value={props.title}
          onChange={ev => updateState('title', ev.currentTarget.value)}
        />
        <h3>Tell Us About Your Meeting</h3>
        <textarea
          rows={8}
          spellCheck
          className="mB4 row"
          placeholder="Meeting Description Here"
          value={props.description}
          onChange={ev => updateState('description', ev.currentTarget.value)}
        />
        <h3>Where is your meeting happening?</h3>
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
            <h3>When&apos;s the meeting?</h3>
            <input
              type="date"
              min={dayJS().toISOString()}
              className="mR2"
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
            <h3>How long is it?</h3>
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
        <div className="brdT1 pT4 pB4 mT4 fx aiCtr">
          <button
            className="p3 mR2 hvrBgGrey1 trans1"
            disabled={disableSubmit}
            onClick={ev => {
              ev.preventDefault();
              props.onSubmit();
            }}>
            Publish
          </button>
          <button
            className="p3 mR2 hvrBgGrey1 trans1"
            disabled={disableSubmit}
            onClick={ev => {
              ev.preventDefault();
              props.saveAsDraft();
            }}>
            Save as Draft
          </button>
          {props.id && (
            <Link
              to={`/draft/${props.id}?${objToQueryString(props)}`}
              className="brdA1 br4 lh1 p3 fs6 hvrBgGrey1 trans1">
              Preview
            </Link>
          )}
        </div>
      </fieldset>
    </form>
  );
});
