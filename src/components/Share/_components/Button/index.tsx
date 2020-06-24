import React, {FunctionComponent, memo} from 'react';

import {tProps} from './_types';

/**
 * @description button half of ShareButton. onClick renders SharePortal
*/
const ShareButton: FunctionComponent<tProps> = memo(props => (
  <button
    className="flex items-center hover:bg-gray-3 mb-2 d:mb-1 p-1 d:p-2 d:pl-3 d:pr-3"
    onClick={props.onClick}>
    <img
      alt=""
      height="22"
      className="mr-1"
      src="/images/share.svg"
      width="16"
    />
    Share
  </button>
));

export default ShareButton;
