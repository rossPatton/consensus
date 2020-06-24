import React, {FunctionComponent, memo, useState} from 'react';

import {ShareButton, SharePortal} from './_components';

/**
 * @description add meeting to your calendar. platform neutral
*/
const ShareContainer: FunctionComponent = memo(() => {
  const [showPortal, togglePortal] = useState(false);
  const onClick = () => togglePortal(!showPortal);

  return (
    <>
      <ShareButton onClick={onClick} />
      {showPortal && (
        <SharePortal onClick={onClick} />
      )}
    </>
  );
});

export default ShareContainer;
