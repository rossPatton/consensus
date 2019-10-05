import dayJS from 'dayjs';
import React, {memo} from 'react';

export const UserComponent = memo(({user}: {user: tUser}) => (
  <div className="contain mT4 mB5">
    {user.username}
  </div>
));
