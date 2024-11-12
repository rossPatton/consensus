import dayJS from 'dayjs';
import _ from 'lodash';
import querystring from 'qs';
import { Link } from 'react-router-dom';
import { Description, Emoji, ExternalLink, MeetingFeaturedImage } from '~/components';
import { cn, slugify } from '~/utils';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Groups, Meetings } from '@prisma/client';

type CompleteMeeting = Meetings & { groups: Groups };

export type Props = {
  deleteMeeting: (e: React.MouseEvent, id: string) => void;
  isEditable?: boolean;
  meetingsToRender: CompleteMeeting[];
  publishedFilter: string;
  renderPastAsFallback?: boolean;
  sessionRole?: string;
  showGroupName?: boolean;
};


export const DesktopMeetings = (props: Props) => {
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
        const isPastMeeting = dayJS(meeting.datetime).isBefore(now);

        const date = isPastMeeting
          ? dayJS(meeting.datetime).format('MMM DD YYYY | h:mmA')
          : dayJS(meeting.datetime).format('MMM DD | h:mmA');

        return (
          <li
            key={meeting.id}
            className={cn('mb-4', {
              // 'opacity-70': isPastMeeting,
            })}>
            <Card className="grid grid-cols-12">
              <div className="col-span-5">
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
              <div className="col-span-7">
                <CardHeader>
                  <CardTitle>
                    {/* <div className="flex mb-4 space-x-1 capitalize items-center">
                    <Badge>
                      {meeting.}
                    </Badge>
                    <Badge>
                      {categories.display}
                    </Badge>
                  </div> */}
                    <Link
                      className="block"
                      to={`/meeting/${meeting.uuid}`}>
                      {meeting.title}
                    </Link>
                  </CardTitle>
                  {/* <Link to={`/group/${group.uuid}/members`}>
                  {memberships.length} {pluralize(group.memberName, memberships.length)}
                </Link> */}
                </CardHeader>
                <CardContent>
                  {meeting.location === 'online' && (
                    <div className="flex items-center mb-1 text-red-3 text-sm font-bold">
                      <img
                        alt=""
                        height="10"
                        className="mr-1"
                        src="/online.svg"
                        width="16"
                      /> Online <span className="ml-1 mr-1">@</span>
                      <time dateTime={date}>
                        {date}
                      </time>
                    </div>
                  )}
                  {meeting.location !== 'online'
                    && (
                      <div className="flex mb-1 text-sm text-red-3 font-bold leading-none">
                        <time className="mr-1" dateTime={date}>
                          {date}
                        </time>
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
                        to={`/group/${slugify(meeting.groups.name)}`}
                        className="font-bold text-sm text-blue-1 no-underline">
                        {meeting.groups.name}
                      </Link>
                    )}
                  {props.isEditable
                    && (
                      <div className="flex items-center font-semibold leading-none">
                        <Link
                          className="text-sm mr-2 no-underline"
                          to={props.sessionRole === 'admin'
                            ? `/admin/planMeeting?${qs}`
                            : `/group/${slugify(meeting.groups.name)}/planMeeting?${qs}`}>
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
                                : `/group/${slugify(meeting.groups.name)}/planMeeting?${qsWithCopy}`}>
                              <Emoji
                                label="Clipboard Emoji"
                                emoji="📋"
                              /> Copy
                            </Link>
                          )}
                        {!isPastMeeting && (
                          <button
                            onClick={e => props.deleteMeeting(e, String(meeting.id))}
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
                </CardContent>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};
