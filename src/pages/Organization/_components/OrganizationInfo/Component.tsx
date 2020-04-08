import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {JoinForm, LeaveForm} from '..';
import {Avatar, ExternalLink} from '../../../../components';
import {tComponentProps} from './_types';

export const OrganizationInfoComponent = memo((props: tComponentProps) => {
  const {match, org, role} = props;
  const {description = ''} = props.org;

  return (
    <div className="bg-white rounded mb-2 d:mb-0 d:mr-2 flex-grow-0 min-w-full d:min-w-1/3">
      <div className="bg-gray-5 rounded m-1 p-1 text-white flex items-center justify-between">
        {!role && (
          <small>
            {org.type === 'public' && 'Public Group'}
            {org.type === 'private' && 'Private Group'}
            {org.type === 'hidden' && 'Hidden Group'}
          </small>
        )}
        <JoinForm role={role} />
        <LeaveForm org={org} role={role} />
      </div>
      <div className="p-2">
        <div className="mb-1">
          <div className="flex d:items-center">
            <Avatar
              hash={org.avatarHash}
              size="60"
              type="group"
            />
            <div>
              <small className="capitalize leading-none text-sm">
                {props.org.category}
              </small>
              <h1 className="leading-none text-3">
                {typeof match.params.section === 'undefined' && (
                  props.org.name
                )}
                {typeof match.params.section !== 'undefined' && (
                  <Link
                    to={`/org/${org.handle}`}
                    title="Click to return to events page">
                    {props.org.name}
                  </Link>
                )}
              </h1>
              {props.role
                && props.role !== 'pending'
                && props.members.length > 0
                && (
                  <Link
                    className="text-sm"
                    to={`/org/${org.handle}/members`}
                    title="Click to browse member list">
                    {props.members.length} Members
                  </Link>
                )}
            </div>
          </div>
        </div>
        <p className="mb-2">
          {description.split('\n')[0]}
        </p>
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
