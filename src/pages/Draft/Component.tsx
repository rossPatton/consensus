import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {ExternalLink, PlaceholderImage} from '../../components';
import {slugify} from '../../utils';
import {tComponentProps} from './_types';

export const DraftComponent = memo((props: tComponentProps) => {
  const {event} = props;

  return (
    <>
      <div className="w-full p-2 mb-2 text-center bgYellow font-bold text-sm">
        This is a draft preview for your meeting.
      </div>
      <div className="contain mt-4">
        <div className="mb-4">
          <Link to={`/org/${slugify(event.orgName)}`} className="no-underline font-bold leading-none">
            {event.orgName}
          </Link>
        </div>
        <div className="flex flex-col d:flex-row mB5 pb-2">
          <div className="mr-3">
            <PlaceholderImage
              height={420}
              seed={event.id}
              width={640}
            />
          </div>
          <div className="w-full relative">
            <time className="font-bold leading-none mb-2" dateTime={event.date}>
              {dayJS(event.date).format('ddd MMM DD YYYY, h:mmA')}
            </time>
            <h1 className=" mb-2 capitalize">
              {event.title}
            </h1>
            <div className="font-bold mb-2">
              <div>
                {event.locationLink && (
                  <ExternalLink
                    noFollow
                    to={event.locationLink}>
                    {event.location}
                  </ExternalLink>
                )}
                {!event.locationLink && event.location}
              </div>
            </div>
            {event.description && (
              <div className="text-base">
                {event.description.split('\n').map((p: string, i) => (
                  <p key={i} className="fs3">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});
