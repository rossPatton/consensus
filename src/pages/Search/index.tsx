import {Helmet, Orgs, SuperSearch} from '@app/components';
import {ErrorBoundary, GenericLoader, Template} from '@app/containers';
import {getGroupsBySearch} from '@app/redux';
import _ from 'lodash';
import qs from 'query-string';
import React, {memo} from 'react';
import {connect} from 'react-redux';

import {tProps, tStore} from './_types';

const meta = [
  { name: 'description', content: 'Search page' },
  { name: 'keywords', content: 'search' },
  { property: 'og:title', content: 'Consensus: Search' },
  { property: 'og:description', content: 'lorem ipsum' },
];

const SearchContainer = memo((props: tProps) => {
  const {orgsBySearch} = props;

  return (
    <Template>
      <ErrorBoundary status={_.get(orgsBySearch, 'error.status', 200)}>
        <Helmet
          canonical="search"
          title="Consensus: Search"
          meta={meta}
        />
        <h1 className="mb-1">
          Search
        </h1>
        <SuperSearch />
        <GenericLoader
          isLoading={orgsBySearch.isLoading}
          render={() => (
            <Orgs
              showLocation
              orgs={orgsBySearch.data}
            />
          )}
        />
      </ErrorBoundary>
    </Template>
  );
});

const mapStateToProps = (store: tStore) => ({
  orgsBySearch: store.orgsBySearch,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getSearchResults: (search: qs.ParsedQuery) => dispatch(getGroupsBySearch(search)),
});

const Search = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);

// page level components need to be default exports for code-splitting /shrug
export default Search;
