import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader, Template} from '~app/containers';
import {getGroup, getMeetingsByGroupId} from '~app/redux';
import {typesafeIdOrSlug} from '~app/utils';

import {tContainerProps, tStore} from './_types';
import {GroupComponent} from './Component';

class GroupContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    this.dispatch();
  }

  componentDidUpdate(nextProps: tContainerProps) {
    const routeChanged = nextProps.match.url !== this.props.match.url;
    if (!routeChanged) return;
    this.dispatch();
  }

  dispatch = async () => {
    const {getGroupDispatch, match} = this.props;
    const slugOrId = typesafeIdOrSlug(match?.params?.idOrSlug);

    let res;
    try {
      if (typeof slugOrId === 'string') {
        res = await getGroupDispatch({handle: slugOrId});
      } else {
        res = await getGroupDispatch({id: slugOrId});
      }
    } catch (err) {
      loglevel.error(err);
    }

    if (res.payload) {
      await this.props.getMeetingsByGroupDispatch({
        groupId: res.payload.id,
        showPast: true,
        limit: -1,
      });
    }
  }

  render() {
    const {location, match, groupThunk, rolesThunk, session} = this.props;

    return (
      <Template>
        <GenericLoader
          isLoading={groupThunk.isLoading}
          render={() => {
            const {groupThunk: {data: group}} = this.props;

            let meta = [
              { name: 'description', content: group.description },
              { name: 'keywords', content: group.category },
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
            if (session.type === 'group' && session.profile.id === group.id) {
              role = 'admin';
            }

            let status = 200 as ts.statusUnion;
            if (group.type === 'hidden') {
              if (!role && session.isAuthenticated) {
                status = 401;
              } else if (!role) {
                return <Redirect to="/login" />;
              }
            }

            return (
              <ErrorBoundary status={status}>
                <Helmet
                  canonical={`group/${group.handle}`}
                  title={`Consensus: ${group.name}`}
                  meta={meta}
                />
                <GroupComponent
                  location={location}
                  match={match}
                  group={group}
                  role={role as ts.role}
                  session={this.props.session}
                />
              </ErrorBoundary>
            );
          }}
        />
      </Template>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  groupThunk: store.group,
  rolesThunk: store.roles,
  rsvpsThunk: store.rsvps,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getGroupDispatch: (query: ts.getGroupQuery) => dispatch(getGroup(query)),
  getMeetingsByGroupDispatch:
    (query: ts.getMeetingQuery) => dispatch(getMeetingsByGroupId(query)),
});

const Group = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupContainer);

export default Group;
