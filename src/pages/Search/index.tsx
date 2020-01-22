import qs from 'querystring';
import React from 'react';
import {connect} from 'react-redux';

import {GenericLoader, Helmet, Orgs} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getOrgsBySearch} from '../../redux';
import {tProps, tStore} from './_types';

class SearchContainer extends React.Component<tProps> {
  constructor(props: tProps) {
    super(props);
    const queryObj = qs.parse(props.location.search.split('?')[1]);
    props.getSearchResults(queryObj);
  }

  render() {
    const {isLoading, search} = this.props;

    // TODO make real
    const meta = [
      { name: 'description', content: 'Search page' },
      { name: 'keywords', content: 'search' },
      { property: 'og:title', content: 'Consensus: Search' },
      { property: 'og:description', content: 'lorem ipsum' },
    ];

    const renderNoResults = !isLoading && search.length === 0;

    return (
      <ErrorBoundary>
        <Helmet
          canonical="search"
          title="Consensus: Search"
          meta={meta}
        />
        <div className="mT4 contain">
          <h1 className="mB2 fs2">
            {renderNoResults ? 'No results!' : 'Your Search Results'}
          </h1>
          <GenericLoader
            isLoading={isLoading}
            render={() => (
              <Orgs
                match={this.props.match}
                orgs={search}
              />
            )}
          />
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.search.isLoading,
  search: store.search.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getSearchResults: (search: qs.ParsedUrlQuery) => dispatch(getOrgsBySearch(search)),
});

const Search = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);

// page level components need to be default exports for code-splitting /shrug
export default Search;
