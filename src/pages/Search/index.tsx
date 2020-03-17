import _ from 'lodash';
import qs from 'query-string';
import React from 'react';
import {connect} from 'react-redux';

import {Helmet, Orgs, SuperSearch} from '../../components';
import {ErrorBoundary, GenericLoader, Template} from '../../containers';
import {getOrgsBySearch} from '../../redux';
import {tProps, tStore} from './_types';

class SearchContainer extends React.PureComponent<tProps> {
  render() {
    const {isLoading, orgsBySearch} = this.props;

    const meta = [
      { name: 'description', content: 'Search page' },
      { name: 'keywords', content: 'search' },
      { property: 'og:title', content: 'Consensus: Search' },
      { property: 'og:description', content: 'lorem ipsum' },
    ];

    const renderNoResults = !isLoading && orgsBySearch.length === 0;

    return (
      <Template>
        <ErrorBoundary status={_.get(orgsBySearch, 'error.status', 200)}>
          <Helmet
            canonical="search"
            title="Consensus: Search"
            meta={meta}
          />
          <div className="mT4 contain">
            <h1 className="fs2 mB3">
              {renderNoResults ? 'No results!' : 'Your Search Results'}
            </h1>
            <SuperSearch />
            <GenericLoader
              isLoading={isLoading}
              render={() => (
                <Orgs
                  showLocation
                  orgs={orgsBySearch}
                />
              )}
            />
          </div>
        </ErrorBoundary>
      </Template>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.orgsBySearch.isLoading,
  orgsBySearch: store.orgsBySearch.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getSearchResults: (search: qs.ParsedQuery) => dispatch(getOrgsBySearch(search)),
});

const Search = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);

// page level components need to be default exports for code-splitting /shrug
export default Search;
