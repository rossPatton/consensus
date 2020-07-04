import _ from 'lodash';
import pluralize from 'pluralize';
import React, { FunctionComponent, memo } from 'react';

import {ExternalLink, Form, Users} from '~app/components';

import {tComponentProps} from './_types';

export const MailerComponent: FunctionComponent<tComponentProps> = memo(props => (
  <div className="rounded d:border d:shadow d:p-2 mb-2">
    <h2 className="text-3 font-bold">
      Email {pluralize(props.group.memberName, 2)}
    </h2>
    <p>
      Emails are sent using a template that includes a link to your group, along with your group name and description.
    </p>
    <Users
      isSelectable
      className="mb-2"
      group={props.group}
      sessionRole="admin"
      type="members"
    />
    {!_.isEmpty(props.checked) && (
      <Form
        error={props.error}
        className="animated fadeInUp"
        name="groupMailerForm"
        onSubmit={props.sendEmail}
        legend={(
          <>
            <h2 className="text-3 font-bold">
              Write your email
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
              Your message
            </h3>
            <textarea
              rows={8}
              maxLength={4096}
              spellCheck
              className="mb-2 w-full"
              placeholder="Your email content here"
              value={props.content}
              onChange={ev => props.updateState('content', ev.currentTarget.value)}
            />
          </>
        )}
        renderSubmit={() => (
          <div>
            <button
              className="p-2 pl-3 pr-3 hover:bg-gray-1"
              onClick={props.sendEmail}>
              Send Email
            </button>
          </div>
        )}
      />
    )}
  </div>
));
