import dayJS from 'dayjs';

import {spacesUrl} from '~app/constants';

export const announcement = (content: string, meeting: ts.meeting): string => {
  const isPastMeeting = dayJS(meeting.date).isBefore(dayJS());
  const date = dayJS(meeting.date);

  const dateTime = date.format('YYYY-MM-DDThh:mm:ssTZD');
  const time = `${date.format(`dddd, MMM DD ${isPastMeeting ? 'YYYY' : ''}`)} | ${date.format('h:mm')}-${dayJS(meeting.endDate).format('h:mmA')}`;

  return `
    <div>
      <div style="margin-bottom: 24px;"
        ${content}
      </div>
      <div style="
        padding: 24px;
        border: 1px solid #efefef;
        border-radius: 8px;
        background: #f6f6f6;">
        <img
          alt=""
          src="${spacesUrl}/groups/${meeting.img}"
          style="margin-bottom: 8px;"
        />
        <time
          dateTime="${dateTime}"
          style="color: #9e3501;margin-bottom: 8px;display: block;">
          ${time}
        </time>
        <h1 style="line-height: 1.2;">
          <a
            style="color: #000;"
            href="https://consens.us.org/meeting/${meeting.id}/${meeting.slug}">
            ${meeting.title}
          </a>
        </h1>
        <p style="font-size: 16px;line-height:1.5;">
          ${meeting.description}
        </p>
      </div>
    </div>
  `;
};

