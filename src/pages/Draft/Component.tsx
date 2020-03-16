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
      <div className="row p3 mB3 taCtr bgYellow fw600 fs6">
        This is a draft preview for your meeting.
      </div>
      <div className="contain mT4">
        <div className="mB4">
          <Link to={`/org/${slugify(event.orgName)}`} className="noUnderline fw600 lh1">
            {event.orgName}
          </Link>
        </div>
        <div className="fx mB5 pB2">
          <div className="mR3">
            <PlaceholderImage
              height={420}
              seed={event.id}
              width={640}
            />
          </div>
          <div className="row rel">
            <time className="fw600 lh1 mB3" dateTime={event.date}>
              {dayJS(event.date).format('ddd MMM DD YYYY, h:mmA')}
            </time>
            <h1 className="fs2 mB3 ttCap">
              {event.title}
            </h1>
            <div className="fw600 mB3">
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
              <div className="fs5">
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
