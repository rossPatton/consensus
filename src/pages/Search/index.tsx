import qs from 'query-string';
import React, {memo} from 'react';
import {connect} from 'react-redux';

import {Groups, Helmet, SuperSearch} from '~app/components';
import {ErrorBoundary, GenericLoader, Template} from '~app/containers';
import {getGroupsBySearch} from '~app/redux';

import {tProps, tStore} from './_types';

const SearchContainer = memo((props: tProps) => (
  <Template>
    <ErrorBoundary status={props.groupsBySearch?.error?.status}>
      <Helmet
        canonical="/search"
        title="Consensus: Search"
        meta={[
          { name: 'description', content: 'Search page' },
          { name: 'keywords', content: 'search' },
        ]}
      />
      <h1 className="mb-1">
        Search
      </h1>
      <SuperSearch />
      <GenericLoader
        isLoading={props.groupsBySearch.isLoading}
        render={() => (
          <Groups
            showLocation
            groups={props.groupsBySearch.data}
          />
        )}
      />
    </ErrorBoundary>
  </Template>
));

const mapStateToProps = (store: tStore) => ({
  groupsBySearch: store.groupsBySearch,
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
