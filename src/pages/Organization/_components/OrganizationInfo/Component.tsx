import pluralize from 'pluralize';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {JoinForm, LeaveForm} from '..';
import {Avatar, Description, ExternalLink} from '../../../../components';
import {tComponentProps} from './_types';

export const OrganizationInfoComponent = memo((props: tComponentProps) => {
  const {match, org, role} = props;
  const {description = ''} = props.org;

  return (
    <div className="bg-white rounded mb-3 d:mb-0 d:mr-2 flex-grow-0 min-w-full d:min-w-1/3">
      <div className="bg-gray-5 rounded m-1 p-1 flex items-center justify-between">
        {!role && (
          <small className="text-white">
            {org.type === 'public' && 'Public Group'}
            {org.type === 'private' && 'Private Group'}
            {org.type === 'hidden' && 'Hidden Group'}
            {/* should never happen, but why not*/}
            {!org.type && 'Group'}
          </small>
        )}
        <JoinForm role={role} />
        <LeaveForm org={org} role={role} />
      </div>
      <div className="p-2">
        <div className="mb-1">
          <div className="flex items-center">
            <Avatar
              hash={org.avatarHash}
              size="60"
              type="group"
            />
            <div>
              <div className="flex items-center text-sm">
                <span className="capitalize mr-1">
                  {props.org.category}
                </span>
                {props.members.length > 0
                  && `${props.members.length} ${pluralize(props.org.memberName, props.members.length)}`}
              </div>
              <h1 className="text-3">
                {typeof match.params.section === 'undefined' && (
                  props.org.name
                )}
                {typeof match.params.section !== 'undefined' && (
                  <Link
                    to={`/org/${org.handle}`}
                    title="Click to return to upcoming meetings page">
                    {props.org.name}
                  </Link>
                )}
              </h1>
            </div>
          </div>
        </div>
        <Description
          description={description}
        />
        <div className="flex">
          {org.facebook && (
            <div className="mr-1">
              <ExternalLink
                noFollow
                to={org.facebook}>
                <img
                  alt="Our Facebook"
                  src="/static/images/fb.svg"
                  width="25"
                />
              </ExternalLink>
            </div>
          )}
          {org.twitter && (
            <div className="mr-1">
              <ExternalLink
                noFollow
                to={org.twitter}>
                <img
                  alt="Our Twitter"
                  src="/static/images/twitter.svg"
                  width="25"
                />
              </ExternalLink>
            </div>
          )}
          {org.website && (
            <div className="mr-1">
              <ExternalLink
                noFollow
                to={org.website}>
                <img
                  alt="Our Website"
                  src="/static/images/website.svg"
                  width="25"
                />
              </ExternalLink>
            </div>
          )}
          {org.emails && (
            <div>
              <img
                alt="Email Us!"
                src="/static/images/email.svg"
                width="25"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
