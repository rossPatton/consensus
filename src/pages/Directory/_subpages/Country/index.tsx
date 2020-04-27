import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Breadcrumbs, Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader} from '~app/containers';
import {getCountry} from '~app/redux';
import {fuzzFilterList} from '~app/utils';

import {tContainerProps, tState, tStore} from './_types';
import {CountryComponent} from './Component';

class CountryContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    props.getCountry(props.match.params);
  }

  state = {
    regionsBySearch: [] as ts.region[],
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const {regions = []} = this.props.country.data;

    this.setState({
      regionsBySearch: fuzzFilterList({
        input: regions,
        search: ev.currentTarget.value,
      }),
    });
  }

  render() {
    const {country, isLoading, match} = this.props;

    return (
      <ErrorBoundary status={country?.error?.status}>
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
          isLoading={isLoading}
          render={() => {
            const crumbs = [{
              display: 'United States',
              to: 'directory/us',
            }];

            const {regions = []} = country.data;
            const {regionsBySearch} = this.state;
            const regionsToRender = regionsBySearch.length > 0
              ? regionsBySearch
              : regions;

            return (
              <>
                <Breadcrumbs crumbs={crumbs} />
                <CountryComponent
                  country={country.data}
                  match={match}
                  onChange={this.onChange}
                  regionsToRender={regionsToRender}
                />
              </>
            );
          }}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  country: store.country,
  isLoading: store.country.isLoading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getCountry: (params: ts.directoryParams) => dispatch(getCountry(params)),
});

const Country = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountryContainer);

export default Country;
