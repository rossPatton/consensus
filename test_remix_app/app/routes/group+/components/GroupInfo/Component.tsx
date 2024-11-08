// import pluralize from 'pluralize';
import { Groups } from '@prisma/client';
import { Link } from '@remix-run/react';

import { Avatar, Description } from '~/components';
import { JoinForm } from '../JoinForm';
import { LeaveForm } from '../LeaveForm';

// import {JoinForm, LeaveForm} from '..';
// import { tComponentProps } from './_types';

export const GroupInfo = (props: { group: Groups }) => {
  const {
    group,
    //role
  } = props;

  const { description = '', name, privacyType } = group;

  return (
    <div className="rounded d:border d:shadow mb-3 d:mb-0 d:mr-2 flex-grow-0 min-w-full d:min-w-4/12">
      <div className="bg-gray-5 font-semibold rounded d:m-1 p-1 flex items-center justify-between">
        {/* {!role && ( */}
        <small className="text-white">
          {privacyType === 'public' && 'Public Group'}
          {privacyType === 'private' && 'Private Group'}
          {privacyType === 'hidden' && 'Hidden Group'}
          {/* should never happen, but why not*/}
          {!privacyType && 'Group'}
        </small>
        {/* )} */}
        <JoinForm role="" />
        <LeaveForm group={group} role="" />
      </div>
      <div className="pt-2 d:p-2">
        <div className="mb-1">
          <div className="flex items-center">
            <Avatar
              hash="1"
            // type="groups"
            />
            <div>
              <div className="flex items-center text-sm">
                <span className="mr-1">
                  <span className="capitalize">
                    {props.group.category}
                  </span> {/*based in {props.group.city}*/}
                </span>
                {/* {props.members.length > 0
                  && `${props.members.length} ${pluralize(props.group.memberName, props.members.length)}`} */}
              </div>
              <h1 className="text-3">
                {/* {typeof match.params.section === 'undefined' && (
                  props.group.name
                )} */}
                <Link
                  to={`/group/${group.uuid}`}
                  title="Click to return to upcoming meetings page">
                  {name}
                </Link>
              </h1>
            </div>
          </div>
        </div>
        <Description
          description={description}
        />
        <div className="flex">
          {/* {group.facebook && (
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
          )} */}
          {/* {group.website && (
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
          )} */}
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
};
