import cx from 'classnames';
import _ from 'lodash';
import { memo } from 'react';

import { Group } from './_components';
import { tComponentProps } from './_types';

export const GroupsComponent = memo((props: tComponentProps) => (
  <ul className={cx({ 'flex flex-wrap': !props.asList })}>
    {props?.groups.length > 0
      && props?.pendingGroups?.length > 0
      && (
        <li className="font-semibold mb-2">
          Current group memberships
        </li>
      )}
    {props.groups.map((group, i) => (
      <Group
        {...props}
        key={group.handle}
        group={group}
        index={i}
      />
    ))}
    {props?.pendingGroups?.length > 0 && (
      <>
        <li className="font-semibold mb-2">
          Pending group memberships
        </li>
        {props?.pendingGroups.map((pendingGroup, i) => (
          <Group
            {...props}
            index={i}
            key={pendingGroup.id}
            group={pendingGroup}
          />
        ))}
      </>
    )}
  </ul>
));
