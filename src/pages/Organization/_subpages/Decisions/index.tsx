import qs from 'querystring';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Dispatch} from 'redux';

import {Helmet} from '../../../../components';
import {Paginate, Search} from '../../../../containers';
import {getDecisionsByOrg} from '../../../../redux';
import {tContainerProps, tState, tStore} from './_types';
import {DecisionsComponent} from './Component';

class DecisionsContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    this.getDecisions();
  }

  state = {
    decisions: [] as tDecision[],
    typeFilter: 'n/a' as tDecisionType,
  };

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
      type: this.state.typeFilter,
    });
  }

  filter = (ds: tDecision[]) => {
    const {typeFilter} = this.state;
    if (typeFilter === 'n/a') return ds;

    // only 2 types atm, easy comparison
    const isApproval = typeFilter === 'Approval';
    return ds.filter(d => {
      if (isApproval) return d.type === 'Approval';
      return d.type !== 'Approval';
    });
  };

  onTypeFilterChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    this.setState({
      typeFilter: ev.currentTarget.value as tDecisionType,
    });
  }

  render() {
    const {location} = this.props;
    const query = qs.parse(location.search.replace('?', ''));
    const isClosed = query.isClosed === 'true';

    const decisionsToRender = this.filter(
      this.state.decisions.length > 0
        ? this.state.decisions
        : this.props.decisions,
    );

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
        <Search
          items={decisionsToRender}
          render={(searchProps: any) => (
            <Paginate
              items={searchProps.items}
              page={this.props.match.params.page}
              render={(itemsToRender: tDecision[]) => (
                <DecisionsComponent
                  decisions={itemsToRender}
                  filterType={this.state.typeFilter}
                  isClosed={isClosed}
                  pathname={location.pathname}
                  onTypeFilterChange={this.onTypeFilterChange}
                  onSearchChange={searchProps.onSearchChange}
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
