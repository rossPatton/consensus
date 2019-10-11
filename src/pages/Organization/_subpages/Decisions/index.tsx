import qs from 'querystring';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../../../components';
import {Paginate} from '../../../../containers';
import {getDecisionsByOrg} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {DecisionsComponent} from './Component';

export class DecisionsContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    this.getDecisions();
  }

  componentDidUpdate(nextProps: tContainerProps) {
    const routeChanged = nextProps.location.search !== this.props.location.search;
    if (!routeChanged) return;
    this.getDecisions();
  }

  getDecisions = () => {
    const {location, match: { params: { page = 0 } = {} }, org} = this.props;
    const query = qs.parse(location.search.replace('?', ''));
    const isClosed = query.isClosed === 'true';
    const offset = page ? parseInt(page, 10) : 0;

    // get active decisions only
    this.props.getDecisionsByOrg({
      id: org.id,
      isClosed,
      limit: -1,
      offset,
    });
  }

  shouldComponentUpdate(nextProps: tContainerProps) {
    const loadingFinished = nextProps.isLoading !== this.props.isLoading;
    const routeChanged = nextProps.location.search !== this.props.location.search;
    const decisionsLoaded = nextProps.decisions.length !== this.props.decisions.length;
    return loadingFinished || routeChanged || decisionsLoaded;
  }

  render() {
    const {location} = this.props;
    const query = qs.parse(location.search.replace('?', ''));
    const isClosed = query.isClosed === 'true';

    return (
      <>
        {!this.props.role && <Redirect to="/login" />}
        <Helmet
          canonical=""
          title=""
          meta={[
            { name: 'description', content: '' },
            { name: 'keywords', content: '' },
            { property: 'og:title', content: '' },
            { property: 'og:description', content: '' },
          ]}
        />
        <GenericLoader
          isLoading={this.props.isLoading}
          render={() => (
            <Paginate
              items={this.props.decisions}
              match={this.props.match}
              render={(itemsToRender: tDecision[]) => (
                <DecisionsComponent
                  decisions={itemsToRender}
                  isClosed={isClosed}
                  pathname={location.pathname}
                />
              )}
            />
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  decisions: store.decisions.data,
  isLoading: store.decisions.isLoading,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getDecisionsByOrg: (query: tIdQuery) => dispatch(getDecisionsByOrg(query)),
});

export const Decisions = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionsContainer);
