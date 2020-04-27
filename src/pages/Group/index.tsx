import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader, Template} from '~app/containers';
import {getGroup, getMeetingsByGroupId, getRoles, getRsvps} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {GroupComponent} from './Component';

class GroupContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const idOrSlug = _.get(props, 'match.params.idOrSlug', null);
    // org route can be reached by groupId or handle
    const isHandle = isNaN(parseInt(idOrSlug, 10));

    if (isHandle) {
      props.getGroupDispatch({handle: idOrSlug})
        .then((res: ts.payload<ts.group>) => {
          return props.getMeetingsByGroupIdDispatch({
            groupId: res.payload.id,
            showPast: false,
            limit: -1,
          });
        })
        .catch(loglevel.error);
    } else {
      props.getGroupDispatch({id: idOrSlug});
      props.getMeetingsByGroupIdDispatch({
        groupId: idOrSlug,
        showPast: false,
        limit: -1,
      });
    }

    if (!props.session.isAuthenticated) return;
    if (props.session.type === 'org') return;
    if (!props.rolesThunk.fetched) props.getRolesDispatch();
    if (!props.rsvpsThunk.fetched) props.getRsvpsDispatch();
  }

  render() {
    const {isLoading, location, match, groupThunk, rolesThunk, session} = this.props;

    return (
      <Template>
        <ErrorBoundary status={_.get(groupThunk, 'error.status', 200)}>
          <GenericLoader
            isLoading={isLoading}
            render={() => {
              const {groupThunk: {data: group}} = this.props;

              // TODO make real
              let meta = [
                { name: 'description', content: '' },
                { name: 'keywords', content: '' },
                { property: 'og:title', content: '' },
                { property: 'og:description', content: '' },
              ];
              if (group.type === 'hidden') {
                meta = [...meta, {
                  name: 'robots',
                  content: 'noindex',
                }];
              }

              const roleMap = rolesThunk.data.find(roleMap => {
                return roleMap.groupId === group.id;
              }) as ts.roleMap;

              let role = roleMap && roleMap.role;
              if (session.type === 'org' && session.profile.id === group.id) {
                role = 'admin';
              }

              const isHidden = group.type === 'hidden' && !role;

              return isHidden
                ? (
                  <Redirect to="/login" />
                ) : (
                  <>
                    <Helmet
                      canonical={`group/${group.handle}`}
                      title={`Consensus: ${group.name}`}
                      meta={meta}
                    />
                    <GroupComponent
                      location={location}
                      match={match}
                      group={group}
                      // unsure why this errors but should be ok?
                      role={role as ts.role}
                      session={this.props.session}
                    />
                  </>
                );
            }}
          />
        </ErrorBoundary>
      </Template>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.group.isLoading,
  groupThunk: store.group,
  rolesThunk: store.roles,
  rsvpsThunk: store.rsvps,
  session: store.session.data,
});


const mapDispatchToProps = (dispatch: Function) => ({
  getMeetingsByGroupIdDispatch:
    (query: ts.getMeetingQuery) => dispatch(getMeetingsByGroupId(query)),
  getGroupDispatch: (query: ts.groupQuery) => dispatch(getGroup(query)),
  getRolesDispatch: () => dispatch(getRoles()),
  getRsvpsDispatch: () => dispatch(getRsvps()),
});

const Group = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupContainer);

// page level components need to be default exports for code-splitting /shrug
export default Group;
