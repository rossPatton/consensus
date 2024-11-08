import dayJS from 'dayjs';
import _ from 'lodash';
import querystring from 'qs';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Description, Emoji, ExternalLink, MeetingFeaturedImage } from '~/components';
import { cn, slugify } from '~/utils';
import { tProps } from './_types';

export const DesktopMeetings: FunctionComponent<tProps> = props => {
  const now = dayJS();

  return (
    <ul className='animated fadeInUp'>
      {props.publishedFilter === 'upcoming'
        && (
          <li className="font-semibold mb-2">
            Upcoming Meetings
          </li>
        )}
      {(props.publishedFilter === 'past' || props.renderPastAsFallback)
        && (
          <li className="font-semibold mb-2">
            Past Meetings
          </li>
        )}
      {props.meetingsToRender.map((meeting, i) => {
        const { id } = meeting;
        const qs = querystring.stringify({ id });
        const qsWithCopy = querystring.stringify({ id, isCopy: true });

        // meetings can be render as all upcoming, all past, or a mix
        const isPastMeeting = dayJS(meeting.date).isBefore(now);

        const date = isPastMeeting
          ? dayJS(meeting.date).format('MMM DD YYYY | h:mmA')
          : dayJS(meeting.date).format('MMM DD | h:mmA');

        return (
          <li
            key={meeting.id}
            className={cn('mb-4', {
              'opacity-5': isPastMeeting,
            })}>
            <div
              className={cn('flex flex-row', {
                'p-2 hover:bg-gray-1 rounded': props.isEditable,
              })}>
              <div className='mr-2 w-4/12'>
                <Link
                  to={meeting.status === "Draft"
                    ? `/draft/${meeting.id}/${meeting.slug}`
                    : `/meeting/${meeting.id}/${meeting.slug}`}>
                  <MeetingFeaturedImage
                    // className="mFI"
                    img={meeting.img}
                    seed={meeting.id}
                  />
                </Link>
              </div>
              <div className='w-8/12'>
                {meeting.location === 'online' && (
                  <div className="flex items-center mb-1 text-red-3 text-sm font-bold">
                    <img
                      alt=""
                      height="10"
                      className="mr-1"
                      src="/online.svg"
                      width="16"
                    /> Online <span className="ml-1 mr-1">@</span>
                    <time dateTime={meeting.date}>
                      {date}
                    </time>
                  </div>
                )}
                {meeting.location !== 'online'
                  && (
                    <div className="flex mb-1 text-sm text-red-3 font-bold leading-none">
                      <time className="mr-1" dateTime={meeting.date}>
                        {date}
                      </time>
                      {!props.horizontal && (
                        <span>
                          <span className="mr-1">@</span>
                          {meeting.locationLink && (
                            <ExternalLink
                              noFollow
                              className="mr-1"
                              to={meeting.locationLink}>
                              {meeting.location}
                            </ExternalLink>
                          )}
                        </span>
                      )}
                      {!meeting.locationLink && meeting.location}
                    </div>
                  )}
                <h3 className="capitalize mb-2 leading-tight">
                  {meeting.status === "Draft" && meeting.title}
                  {meeting.status !== "Draft"
                    && (
                      <Link to={`/meeting/${meeting.id}/${meeting.slug}`}>
                        {meeting.title}
                      </Link>
                    )}
                </h3>
                <Description
                  description={meeting.description}
                />
                {props.showGroupName
                  && (
                    <Link
                      to={`/group/${slugify(meeting.groupName)}`}
                      className="font-bold text-sm text-blue-1 no-underline">
                      {meeting.groupName}
                    </Link>
                  )}
                {props.isEditable
                  && (
                    <div className="flex items-center font-semibold leading-none">
                      <Link
                        className="text-sm mr-2 no-underline"
                        to={props.sessionRole === 'admin'
                          ? `/admin/planMeeting?${qs}`
                          : `/group/${slugify(meeting.groupName)}/planMeeting?${qs}`}>
                        <Emoji
                          label="Hand with Pen Emoji"
                          emoji="✍️"
                        /> Edit
                      </Link>
                      {meeting.status !== "Draft"
                        && (
                          <Link
                            className="text-sm mr-2 no-underline"
                            to={props.sessionRole === 'admin'
                              ? `/admin/planMeeting?${qsWithCopy}`
                              : `/group/${slugify(meeting.groupName)}/planMeeting?${qsWithCopy}`}>
                            <Emoji
                              label="Clipboard Emoji"
                              emoji="📋"
                            /> Copy
                          </Link>
                        )}
                      {!isPastMeeting && (
                        <button
                          onClick={e => props.deleteMeeting(e, meeting.id)}
                          className="border-0 bg-0 text-sm mr-2">
                          <Emoji
                            label="Big X Emoji"
                            emoji="✖️"
                          /> Delete
                        </button>
                      )}
                      {meeting.status === "Draft" && (
                        <Link
                          to={`/draft/${meeting.id}`}
                          className="text-sm no-underline">
                          <Emoji
                            label="Eye Emoji"
                            emoji="👁️"
                          />
                          Preview
                        </Link>
                      )}
                    </div>
                  )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
