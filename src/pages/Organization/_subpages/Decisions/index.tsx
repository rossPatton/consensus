import qs from 'querystring';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Dispatch} from 'redux';

import {Helmet} from '../../../../components';
import {DecisionTypeFilter, Search} from '../../../../containers';
import {getDecisionsByOrg} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {DecisionsComponent} from './Component';

class DecisionsContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    this.getDecisions();
  }

  componentDidUpdate() {
    this.getDecisions();
  }

  private getDecisions = () => {
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

  render() {
    const {location} = this.props;
    const query = qs.parse(location.search.replace('?', ''));

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
        <DecisionTypeFilter
          items={this.props.decisions}
          render={(decisionTypeProps: any) => (
            <Search
              items={decisionTypeProps.items}
              render={(searchProps: any) => (
                <DecisionsComponent
                  {...decisionTypeProps}
                  {...searchProps}
                  isClosed={query.isClosed === 'true'}
                  match={this.props.match}
                  pathname={location.pathname}
                  role={this.props.role}
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

const Decisions = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DecisionsContainer);

export default Decisions;
