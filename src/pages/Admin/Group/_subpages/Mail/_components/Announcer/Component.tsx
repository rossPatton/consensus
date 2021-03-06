import cx from 'classnames';
import _ from 'lodash';
import pluralize from 'pluralize';
import React, { FunctionComponent, memo } from 'react';

import {ExternalLink, Form} from '~app/components';

import {tComponentProps} from './_types';

export const AnnouncerComponent: FunctionComponent<tComponentProps> = memo(props => (
  <div className="rounded d:border d:shadow d:p-2">
    <h2 className="text-3 font-bold">
      Announce Meeting
    </h2>
    <p>
      Announcement emails are sent using a template that includes a link to your meeting, along with the meeting title and description. Good for announcing a newly created meeting, or sending a reminder.
    </p>
    <select
      className="mb-2"
      value={props.meetingIndex}
      onBlur={ev => props.updateState('meetingIndex', ev.currentTarget.value)}
      onChange={ev => props.updateState('meetingIndex', ev.currentTarget.value)}>
      <option value="0">
        Select meeting to announce
      </option>
      {props.meetings.map((meeting, i) => (
        <option key={meeting.id} value={i + 1}>
          {meeting.title}
        </option>
      ))}
    </select>
    {props.meetingIndex !== 0 && (
      <>
        <h2 className="text-3 mb-1 font-bold">
          To who?
        </h2>
        <select
          className="mb-2"
          name="cohort"
          value={props.cohort}
          onBlur={ev => props.updateState('cohort', ev.currentTarget.value)}
          onChange={ev => props.updateState('cohort', ev.currentTarget.value)}>
          <option value="">
            Select user subset for meeting announcement
          </option>
          <option value="yes">
            Anyone who RSVPed &apos;yes&apos;
          </option>
          <option value="maybe">
            Anyone who RSVPed &apos;maybe&apos;
          </option>
          <option value="yesmaybe">
            Anyone who RSVPed &apos;yes&apos; OR &apos;maybe&apos;
          </option>
          <option value="all">
            All {pluralize(props.group.memberName, 2)} and {pluralize(props.group.modName, 2)}
          </option>
        </select>
      </>
    )}
    {props.cohort && (
      <Form
        error={props.error}
        className="animated fadeInUp"
        name="groupMailerForm"
        onSubmit={() => props.sendEmail()}
        legend={(
          <>
            <h2 className="text-3 font-bold">
              Meeting announcement or updates here
            </h2>
            <p className="mb-2">
              Markdown is supported. <ExternalLink to="https://www.markdownguide.org/basic-syntax/">Learn more about markdown</ExternalLink>.
            </p>
          </>
        )}
        renderFields={() => (
          <>
            <h3 className="text-base font-semibold">
              Subject
            </h3>
            <input
              spellCheck
              maxLength={4096}
              className="mb-2 w-full"
              placeholder="Email subject here"
              value={props.subject}
              onChange={ev => props.updateState('subject', ev.currentTarget.value)}
            />
            <h3 className="text-base font-semibold">
              Content
            </h3>
            <textarea
              rows={8}
              spellCheck
              className="mb-3 w-full"
              placeholder="Want folks to know about a last minute event? Change the meeting time? Want to share the Zoom password?"
              value={props.content}
              onChange={ev => props.updateState('content', ev.currentTarget.value)}
            />
          </>
        )}
        renderSubmit={formProps => {
          const isDisabled = !formProps.hasMounted
            || !props.content
            || !props.subject;

          return (
            <div>
              <button
                disabled={isDisabled}
                className={cx({
                  'p-2 pl-3 pr-3 mb-1 d:mb-0 d:mr-1 w-full d:w-auto': true,
                  'bg-green-1 hover:bg-green-2': formProps.hasMounted,
                })}>
                Send Email
              </button>
              <button
                disabled={isDisabled}
                className="p-2 pl-3 pr-3 mb-1 d:mb-0 d:mr-1 w-full d:w-auto hover:bg-gray-1"
                onClick={ev => {
                  ev.preventDefault();
                  props.sendEmail(true);
                }}>
                Send Test Email
              </button>
            </div>
          );
        }}
      />
    )}
  </div>
));
