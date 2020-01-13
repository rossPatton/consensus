import qs from 'querystring';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getOrgsBySearch} from '../../redux';
import {tProps} from './_types';

class SearchContainer extends React.PureComponent<tProps> {
  constructor(props: tProps) {
    super(props);
    const queryObj = qs.parse(this.props.location.search.split('?')[1]);
    props.getSearchResults(queryObj);
  }

  render() {
    // TODO make real
    const meta = [
      { name: 'description', content: 'Search page' },
      { name: 'keywords', content: 'search' },
      { property: 'og:title', content: 'Consensus: Search' },
      { property: 'og:description', content: 'lorem ipsum' },
    ];

    return (
      <ErrorBoundary>
        <Helmet
          canonical="search"
          title="Consensus: Search"
          meta={meta}
        />
        <div className="mT4 contain">
          <h1 className="mB2 fs2">
            Your Search Results
          </h1>
          <GenericLoader
            isLoading={this.props.isLoading}
            render={() => (
              <ul className="fx fxWrap">
                {this.props.search.map((org: tOrg, i) => (
                  <li
                    key={i}
                    className="col fxg0 third mB3">
                    <Link
                      to={`/org/${org.id}/overview`}
                      className="dBl fs6 lh1 p3 brdA1 br8 hvrBgGrey1 trans2 noUnderline">
                      {org.category}
                      <h2 className="dBl lh1 fs3 mT1 mB3 underline">
                        {org.name}
                      </h2>
                      <div>
                        Based in {org.city}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          />
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: any) => ({
  isLoading: store.search.isLoading,
  search: store.search.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getSearchResults: (search: string) => dispatch(getOrgsBySearch(search)),
});

const Search = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);

// page level components need to be default exports for code-splitting /shrug
export default Search;
