import React, {memo} from 'react';
import {connect} from 'react-redux';

import {Groups, Helmet, SuperSearch} from '~app/components';
import {ErrorBoundary, GenericLoader, Template} from '~app/containers';

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
          props.groupsBySearch.data.length > 0
            ? (
              <Groups
                showLocation
                groups={props.groupsBySearch.data}
              />
            ) : (
              <div className="text-3 font-semibold">
              No groups found! Try a more specific search?
              </div>
            )
        )}
      />
    </ErrorBoundary>
  </Template>
));

const mapStateToProps = (store: tStore) => ({
  groupsBySearch: store.groupsBySearch,
});

const Search = connect(mapStateToProps)(SearchContainer);

// page level components need to be default exports for code-splitting /shrug
export default Search;
