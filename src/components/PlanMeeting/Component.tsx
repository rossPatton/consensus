import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import { Emoji, FileUpload, Form } from '~app/components';
import { meetingTypes } from '~app/constants';

import { tComponentProps } from './_types';

export const PlanMeetingComponent = (props: tComponentProps) => {
  const { updateState } = props;
  const disableSubmit = !props.title || !props.date || !props.time;
  let legend = 'Plan Event';
  if (props.isDraft && props.isCopy) {
    legend = 'Copying Event';
  }
  if (props.isDraft && !props.isCopy) {
    legend = 'Edit Event Draft';
  }

  return (
    <div className="d:pb-2 d:pl-2 d:pr-2">
      <Form
        encType="multipart/form-data"
        error={props.error}
        name="planEventForm"
        onSubmit={props.onSubmit}
        legend={props.heading && (
          <h2 className="text-3 mb-1">{legend}</h2>
        )}
        renderFields={() => (
          <>
            <h3 className="text-base mb-1">Event Title</h3>
            <input
              className="mb-3 w-full"
              placeholder="Your Event Title Here"
              value={props.title}
              onChange={ev => updateState('title', ev.currentTarget.value)}
            />
            <FileUpload
              fieldKey="meetingFeaturedImage"
              folder="groups"
              img={props.img}
              info="We recommend a size of at least 760x428px"
              prefix={`g${props.group.id}:mFI`}
              title="Upload Featured Image"
            />
            <h3 className="text-base mb-1">
              What type of Event is it?
            </h3>
            <label htmlFor="typeSelect">
              <select
                name="type"
                id="typeSelect"
                className="mb-3 w-full"
                value={props.tag}
                onBlur={ev => updateState('tag', ev.currentTarget.value)}
                onChange={ev => updateState('tag', ev.currentTarget.value)}>
                {meetingTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <h3 className="text-base mb-1">Tell Us About Your Event</h3>
            <textarea
              rows={8}
              spellCheck
              className="mb-3 w-full"
              placeholder="Event Description Here. If meeting is online, put video conferencing details here as well."
              value={props.description}
              onChange={ev => updateState('description', ev.currentTarget.value)}
            />
            <h3 className="text-base mb-1">Event Host</h3>
            <input
              className="mb-3 w-full"
              placeholder="Is your meeting being hosted by a different group or person?"
              onChange={ev => updateState('host', ev.currentTarget.value)}
              value={props.host}
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
                  className="flex-1 mr-1 w-auto"
                  autoComplete="off"
                  checked={props.isOnline}
                />
                <span className="w-full">
                  {props.isOnline && (
                    'My event is online. Put meeting link below. Users who RSVP will see it.'
                  )}
                  {!props.isOnline && (
                    'Event is in person. Put location details below.'
                  )}
                </span>
              </div>
              <div className="flex flex-col d:flex-row">
                {props.isOnline && (
                  <input
                    className="w-full"
                    placeholder="Online meeting link here"
                    onChange={ev => updateState('locationLink', ev.currentTarget.value)}
                    value={props.locationLink}
                  />
                )}
                {!props.isOnline && (
                  <>
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
                      placeholder="Google Maps or other map service link here"
                      value={props.locationLink}
                      onChange={ev => updateState('locationLink', ev.currentTarget.value)}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col d:flex-row mb-2">
              <div className="mb-1 d:mb-0 d:mr-2">
                <h3 className="text-base mb-1">When&apos;s the meeting?</h3>
                <input
                  type="date"
                  min={dayJS().format('YYYY-MM-DD')}
                  className="w-full"
                  value={dayJS(props.date).format('YYYY-MM-DD')}
                  placeholder="Event Date Here"
                  onChange={ev => updateState('date', ev.currentTarget.value)}
                />
              </div>
              <div>
                <h3 className="text-base mb-1">How long does it last?</h3>
                <div className="flex d:flex-row">
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
            </div>
          </>
        )}
        renderSubmit={() => (
          <div className="mb-3 d:mb-0 flex items-center">
            {/*
              we only use the meetingThunk here. rest is from the form
              mainly because we fetch events when copying (we want id blank when copying, because we're making a new event)
            */}
            {props.meetingThunk.isLoading
              ? 'Saving...'
              : (
                <>
                  <button
                    id="testPublish"
                    className={cx({
                      'p-2 mr-1': true,
                      'bg-green-1 hover:bg-green-2': !disableSubmit,
                    })}
                    disabled={disableSubmit}
                    onClick={ev => {
                      ev.preventDefault();
                      props.onSubmit();
                    }}>
                    {props.isPublished ? 'Update' : 'Publish'}
                  </button>
                  {!props.isPublished && (
                    <button
                      id="testSaveAsDraft"
                      className="p-2 mr-1 hover:bg-gray-3"
                      disabled={disableSubmit}
                      onClick={ev => {
                        ev.preventDefault();
                        props.saveAsDraft();
                      }}>
                      {/* if first time editing this event or not, basically */}
                      {!props.isDraft ? 'Save as Draft' : 'Save Changes'}
                    </button>
                  )}
                  <Link
                    to={props.isDraft
                      ? `/draft/${props.id}/${props.slug}`
                      : `/meeting/${props.id}/${props.slug}`}
                    className="btn p-2 hover:bg-gray-3 no-underline">
                    <Emoji
                      emoji="👁️"
                      label="Eye Emoji"
                    /> <span className="underline">
                      {!props.isDraft ? 'View Meeting' : 'Preview'}
                    </span>
                  </Link>
                </>
              )}
          </div>
        )}
      />
    </div>
  );
};
