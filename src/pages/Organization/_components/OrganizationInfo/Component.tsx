import cx from 'classnames';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {JoinForm, LeaveForm} from '..';
import {ExternalLink, PlaceholderImage} from '../../../../components';
import {tComponentProps} from './_types';

export const OrganizationInfoComponent = memo((props: tComponentProps) => {
  const {match, org, role} = props;
  const {description = ''} = props.org;

  return (
    <div className="bg-white br8 mr-3 c3  growNone ovfHide">
      <div className="bgGrey4 leading-none flex items-center jcBetween p-3">
        {!role && (
          <small className="text-bold white">
            {org.type === 'public' && 'Public Group'}
            {org.type === 'private' && 'Private Group'}
            {org.type === 'hidden' && 'Hidden Group'}
          </small>
        )}
        <div
          className={cx({
            ' flex items-center': true,
            jcEnd: !role,
          })}>
          <JoinForm role={role} />
        </div>
        <LeaveForm org={org} role={role} />
      </div>
      <div className="p-3">
        <div className="mb-3">
          <div className="flex flex-col d:flex-row items-center">
            <div className="circ mr-2 ovfHide">
              <PlaceholderImage
                height={60}
                width={60}
              />
            </div>
            <div>
              <small className="ttUpper fs7">
                {props.org.category}
              </small>
              <h1 className="fs3 leading-none">
                {typeof match.params.section === 'undefined' && (
                  props.org.name
                )}
                {typeof match.params.section !== 'undefined' && (
                  <Link
                    to={`/org/${org.id}`}
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
                    to={`/org/${org.id}/members`}
                    className="fs7"
                    title="Click to browse member list">
                    {props.members.length} Members
                  </Link>
                )}
            </div>
          </div>
        </div>
        <p className="text-sm">
          {description.split('\n')[0]}
        </p>
        <div className="flex flex-col d:flex-row items-center">
          {org.facebook && (
            <div className="mr-2">
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
            <div className="mr-2">
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
            <div className="mr-2">
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
