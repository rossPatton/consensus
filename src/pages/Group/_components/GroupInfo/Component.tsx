import pluralize from 'pluralize';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Avatar, Description, ExternalLink} from '~app/components';

import {JoinForm, LeaveForm} from '..';
import {tComponentProps} from './_types';

export const GroupInfoComponent = memo((props: tComponentProps) => {
  const {match, group, role} = props;
  const {description = ''} = props.group;

  return (
    <div className="rounded d:border d:shadow mb-3 d:mb-0 d:mr-2 flex-grow-0 min-w-full d:min-w-1/3">
      <div className="bg-gray-5 font-semibold rounded d:m-1 p-1 flex items-center justify-between">
        {!role && (
          <small className="text-white">
            {group.type === 'public' && 'Public Group'}
            {group.type === 'private' && 'Private Group'}
            {group.type === 'hidden' && 'Hidden Group'}
            {/* should never happen, but why not*/}
            {!group.type && 'Group'}
          </small>
        )}
        <JoinForm role={role} />
        <LeaveForm group={group} role={role} />
      </div>
      <div className="pt-2 d:p-2">
        <div className="mb-1">
          <div className="flex items-center">
            <Avatar
              hash={group.avatar}
              type="groups"
            />
            <div>
              <div className="flex items-center text-sm">
                <span className="capitalize mr-1">
                  {props.group.category}
                </span>
                {props.members.length > 0
                  && `${props.members.length} ${pluralize(props.group.memberName, props.members.length)}`}
              </div>
              <h1 className="text-3">
                {typeof match.params.section === 'undefined' && (
                  props.group.name
                )}
                {typeof match.params.section !== 'undefined' && (
                  <Link
                    to={`/group/${group.handle}`}
                    title="Click to return to upcoming meetings page">
                    {props.group.name}
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
          {group.facebook && (
            <div className="mr-1">
              <ExternalLink
                noFollow
                to={group.facebook}>
                <img
                  alt="Our Facebook"
                  src="/images/fb.svg"
                  width="25"
                />
              </ExternalLink>
            </div>
          )}
          {group.twitter && (
            <div className="mr-1">
              <ExternalLink
                noFollow
                to={group.twitter}>
                <img
                  alt="Our Twitter"
                  src="/images/twitter.svg"
                  width="25"
                />
              </ExternalLink>
            </div>
          )}
          {group.website && (
            <div className="mr-1">
              <ExternalLink
                noFollow
                to={group.website}>
                <img
                  alt="Our Website"
                  src="/images/website.svg"
                  width="25"
                />
              </ExternalLink>
            </div>
          )}
          {/* {group.showEmail && (
            <div>
              <img
                alt="Email Us!"
                src="/images/email.svg"
                width="25"
              />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
});
