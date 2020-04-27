import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

import {MediaContext} from '~app/context/MatchMediaProvider/_context';

import {Aside} from './_components';
import {
  Account,
  DeleteGroup,
  Meetings,
  Members,
  PlanMeeting,
  Profile,
} from './_subpages';
import {tProps} from './_types';

class GroupAdminContainer extends React.PureComponent<tProps> {
  static contextType = MediaContext;

  render() {
    const {match, session} = this.props;
    const {section} = match.params;
    const isAccount = section === 'account';
    const isDelete = section === 'deleteGroup';
    const isMeetings = section === 'meetings';
    const isProfile = section === 'profile';
    const isMembers = section === 'memberships';
    const isMeetingForm = section === 'planMeeting';

    if (!session.isAuthenticated) return <Redirect to="" />;

    return (
      <>
        {session.deletionDeadline && (
          <div
            className={cx({
              'w-full p-2 text-center bg-yellow-1 font-bold text-sm': true,
              'mb-2': session.isVerified,
            })}>
            Your group will be deleted on {dayJS(session.deletionDeadline).format('MMM DD')}
          </div>
        )}
        {!session.isVerified && (
          <div className="bg-yellow-2 rounded p-2 mb-3 text-center font-bold text-sm">
            Welcome to Consensus! Your group will not be listed and some functionality will be unavailable until you link an email to this account and verify it. Click <Link to="/admin/account/edit">here</Link> to add or verify your email.
          </div>
        )}
        <div className="flex flex-col d:flex-row items-start">
          <Aside
            isDesktop={this.context.isDesktop}
            isMobile={this.context.isMobile}
            session={session}
            isMeetings={isMeetings}
            isMeetingForm={isMeetingForm}
            isMembers={isMembers}
          />
          <div className="order-1 d:order-2 min-w-full d:min-w-2/3 mb-2 d:mb-0">
            {isAccount && <Account match={this.props.match} />}
            {isDelete && <DeleteGroup />}
            {isMeetings && <Meetings match={this.props.match} />}
            {isProfile && <Profile match={this.props.match} />}
            {isMembers && (
              <Members
                group={this.props.session.profile as tGroup}
                match={this.props.match}
              />
            )}
            {isMeetingForm && (
              <PlanMeeting
                group={this.props.session.profile as tGroup}
                router={this.props.location}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (store: {session: tThunk<ts.session<tGroup>>}) => ({
  session: store.session.data,
});

export const GroupAdmin = connect(mapStateToProps, null)(GroupAdminContainer);
