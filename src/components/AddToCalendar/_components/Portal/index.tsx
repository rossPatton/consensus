// import cx from 'classnames';
import React, {FunctionComponent, memo} from 'react';
import ReactDOM from 'react-dom';

import {Emoji} from '~app/components';

import {tProps} from './_types';

/**
 * @description portal half of AddToCalendar. renders on click
*/
const AddToCalendarPortal: FunctionComponent<tProps> = memo(props => {
  const portalNode = document.getElementById('portal');

  return ReactDOM.createPortal(
    <aside className="animated fadeInUp b fixed flex flex-col items-center l p-4 r t-hdr">
      <div className="relative bg-white border font-semibold p-3 rounded z-10">
        <button
          className="border-0"
          onClick={props.onRequestClose}>
          <Emoji
            className="absolute t r p-2 text-3"
            label="Close Modal"
            emoji="✖️"
          />
        </button>
        <div className="font-bold text-3 mb-1">
          Add this meeting to your calendar
        </div>
        <ul>
          {props.children.map((child, i) => (
            <li
              key={i}
              className="mb-1 text-blue-1">
              {child}
            </li>
          ))}
        </ul>
      </div>
      <div
        role="button"
        tabIndex={0}
        className="absolute b bg-gray-1 l opacity-5 r t"
        onKeyPress={props.onRequestClose}
        onClick={props.onRequestClose}
      />
    </aside>,
    portalNode,
  );
});

export default AddToCalendarPortal;
