import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

export const EventsComponent = memo((props: tProps) => {
  return (
    <ul>
      {props.events.map((ev: tEvent, i) => (
        <li
          key={i}
          className="p3 brdA1 br8 mB3">
          <h2 className="fs3 ttCap">
            <Link to={`/event/${ev.id}`}>
              {ev.title}
            </Link>
          </h2>
        </li>
      ))}
    </ul>
  );
});
