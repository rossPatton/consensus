import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {ExternalLink, PlaceholderImage} from '~app/components';
import {slugify} from '~app/utils';

import {tComponentProps} from './_types';

export const DraftComponent = memo((props: tComponentProps) => {
  const {meeting} = props;

  return (
    <>
      <div className="w-full p-1 mb-2 text-center bg-yellow-2 font-bold text-sm">
        This is a draft preview for your meeting.
      </div>
      <div className="mb-2">
        <Link
          to={`/group/${slugify(meeting.groupName)}`}
          className="no-underline font-bold leading-none">
          {meeting.groupName}
        </Link>
      </div>
      <div className="flex flex-col d:flex-row mb-4 pb-2">
        <div className="mr-3">
          <PlaceholderImage
            height={420}
            seed={meeting.id}
            width={640}
          />
        </div>
        <div className="w-full relative">
          <time className="font-bold leading-none mb-2" dateTime={meeting.date}>
            {dayJS(meeting.date).format('ddd MMM DD YYYY, h:mmA')}
          </time>
          <h1 className=" mb-2 capitalize">
            {meeting.title}
          </h1>
          {!meeting.isOnline
            && meeting.location
            && (
              <div className="font-bold flex items-center text-gray-5">
                <span className="rounded-circ p-1 bg-gray-3 mr-2" />
                {meeting.locationLink && (
                  <ExternalLink
                    noFollow
                    className="no-underline"
                    to={meeting.locationLink}>
                    {meeting.location}
                  </ExternalLink>
                )}
                {!meeting.locationLink && meeting.location}
              </div>
            )}
          {meeting.description && (
            <div className="text-base">
              {meeting.description.split('\n').map((p: string, i) => (
                <p key={i} className="text-3">
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
});
