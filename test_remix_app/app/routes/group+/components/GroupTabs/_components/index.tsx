import cx from 'classnames';
import { Link, useParams } from '@remix-run/react';

export const Tab = (props: { text: string, to: string }) => {
  const { text, to } = props;
  const params = useParams();
  console.log("params ? ", params);

  // const { match, subRoute } = props;
  // const { idOrSlug, section } = match.params;
  // const route = `/${subRoute}`;
  // const to = `/group/${idOrSlug}${subRoute ? route : ''}`;
  // const text = routeDisplayMap[subRoute];
  // const isMeetings = subRoute === '' && typeof section === 'undefined';
  // const isActive = isMeetings || section === subRoute;
  const className = cx({
    'text-gray-5': true,
    // 'd:ml-2': ['', 'members'].indexOf(subRoute) === -1,
    // 'text-base d:text-3': isActive,
    // 'no-underline': !isActive,
  });

  // dont render link if you're on the section page itself
  // if (isMeetings || section === subRoute) {
  //   return (
  //     <h2 className={className}>
  //       {text}
  //     </h2>
  //   );
  // }

  return (
    <Link
      to={`${params.groupId}/${to}`}
      relative="path"
      className={className}>
      {text}
    </Link>
  );
};

// const routeDisplayMap = {
//   '': 'Meetings',
//   planMeeting: props.isDesktop ? 'Plan Meeting' : 'Plan',
//   drafts: props.isDesktop ? 'Meeting Drafts' : 'Drafts',
//   meetings: 'Meetings',
//   pending: props.isDesktop ? 'Pending Approvals' : 'Pending',
//   members: props.isDesktop ? 'Current Members' : 'Members',
// };
