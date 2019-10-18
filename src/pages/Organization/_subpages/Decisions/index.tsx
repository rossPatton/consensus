import qs from 'querystring';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../../../components';
import {Paginate} from '../../../../containers';
import {getDecisionsByOrg} from '../../../../redux';
import {fuzzFilterList} from '../../../../utils';
import {tContainerProps, tState, tStore} from './_types';
import {DecisionsComponent} from './Component';

class DecisionsContainer extends Component<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    this.getDecisions();
  }

  state = {
    decisions: [],
    typeFilter: 'n/a' as tDecisionType,
  };

  componentDidUpdate() {
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

  onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const filteredList = fuzzFilterList({
      input: this.props.decisions || [],
      key: 'title',
      search: ev.currentTarget.value,
    });

    this.setState({
      decisions: filteredList,
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
        : this.props.decisions
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
        <GenericLoader
          isLoading={this.props.isLoading}
          render={() => (
            <Paginate
              items={decisionsToRender}
              match={this.props.match}
              render={(itemsToRender: tDecision[]) => (
                <DecisionsComponent
                  decisions={itemsToRender}
                  isClosed={isClosed}
                  pathname={location.pathname}
                  onTypeFilterChange={this.onTypeFilterChange}
                  onSearchChange={this.onSearchChange}
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
  mapDispatchToProps
)(DecisionsContainer);

export default Decisions;
