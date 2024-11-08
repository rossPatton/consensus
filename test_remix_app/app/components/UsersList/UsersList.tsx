import { Link } from 'react-router-dom';

import { cn } from '~/utils';
import { Avatar, Emoji, FilterPanel } from '~/components';
// import { LoaderFunction } from '@remix-run/node';
// import { db } from '~/utils/db.server';
// import { useLoaderData } from '@remix-run/react';
// import { Users } from '@prisma/client';
// import { roles } from '~app/constants';
// import { MediaContext } from '~app/context';

// import { tComponentProps } from './_types';

export const UsersList = (props: any) => {
  console.log("🚀 ~ UsersList ~ props:", props)
  // const { isDesktop, isMobile } = useContext(MediaContext);
  const { group: { memberName, modName }, isEditable, isSelectable, type, users } = props;
  const includeRoleFilter = type === 'members' && isEditable;

  return (
    <div className={props.className}>
      <FilterPanel
        onRoleFilterChange={includeRoleFilter && props.onRoleFilterChange}
        onSearchChange={props.onSearchChange}
        memberName={memberName}
        modName={modName}
        placeholder="Search for someone by username"
      />
      {users instanceof Array
        && users.length > 0
        && (
          <ul>
            {isSelectable && (
              <li>
                <button
                  className="p-1 pl-2 pr-2 mb-2 hover:bg-gray-1"
                  onClick={() => props.toggleAll(props.users)}>
                  {props.allSelected ? 'Unselect' : 'Select'} all
                </button>
              </li>
            )}
            {users.map((user, i) => {
              let showControls = isEditable;// && isDesktop;
              // if (isMobile) {
              //   showControls = isEditable && props.showMobileControls === i;
              // }

              return (
                <li
                  key={i}
                  className="rounded flex items-center mb-1 p-1 relative">
                  {isSelectable && (
                    <button
                      tabIndex={0}
                      role="button"
                      className="cursor-ptr flex d:flex-row items-center text-sm p-2"
                      onClick={() => props.toggleCheck(user.id)}>
                      <input
                        readOnly
                        type="checkbox"
                        className="flex-1 w-auto"
                        autoComplete="off"
                        checked={!!props.checked[user.id]}
                      />
                    </button>
                  )}
                  <div
                    className={cn('flex items-center', {
                      hidden: showControls //isMobile && showControls,
                    })}>
                    <Avatar
                      hash={user.avatar}
                      type="users"
                    />
                    <div>
                      <div className="text-sm flex items-center leading-none">
                        {user.role !== 'pending' && (
                          <b className="mr-2">
                            {user.role === 'member' ? memberName : modName}
                          </b>
                        )}
                      </div>
                      <h3>
                        <Link to={`/user/${user.id}`}>
                          @{user.username}
                        </Link>
                      </h3>
                    </div>
                  </div>
                  {(isEditable)
                    && (
                      <button
                        className="absolute r p-1 mr-1"
                        onClick={() => props.toggleMobileControls(i)}>
                        {showControls ? 'Show' : 'Edit'}
                      </button>
                    )}
                  {showControls && (
                    <div className="flex d:absolute r d:mr-2 p-1 d:p-0">
                      <button
                        className="border-0 bg-0 mr-2"
                        onClick={ev => props.removeUser(ev, user.id)}>
                        <Emoji
                          className="mr-1"
                          label="Big Red X Emoji"
                          emoji="❌"
                        />
                        {user.role === 'pending' ? 'Reject' : 'Remove'}
                      </button>
                      <select
                        value={user.role as string}
                        onChange={ev => props.setUserRole(ev, user.id)}>
                        <option key="" value={user.role}>
                          {user.role === 'pending' ? 'Approve' : 'Change role'}
                        </option>
                        {/* {roles.map(role => (
                          role === user.role
                            ? null
                            : (
                              <option
                                key={role}
                                value={role}>
                                {role === 'member' ? memberName : modName}
                              </option>
                            )
                        ))} */}
                      </select>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
    </div>
  );
};

