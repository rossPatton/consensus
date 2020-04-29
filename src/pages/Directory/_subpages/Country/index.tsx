import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Breadcrumbs, Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader} from '~app/containers';
import {getCountry} from '~app/redux';
import {fuzzFilterList} from '~app/utils';

import {tContainerProps, tState} from './_types';
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
    const {regions = []} = this.props.countryThunk.data;

    this.setState({
      regionsBySearch: fuzzFilterList({
        input: regions,
        search: ev.currentTarget.value,
      }),
    });
  }

  render() {
    const {countryThunk, match} = this.props;

    return (
      <ErrorBoundary status={countryThunk?.error?.status}>
        <Helmet
          canonical="/us"
          title="Consensus Directory: Regions by Country"
          meta={[
            { name: 'description', content: 'Search for local groups to join in your city!' },
            { name: 'keywords', content: 'directory,search,city' },
          ]}
        />
        <GenericLoader
          isLoading={countryThunk.isLoading}
          render={() => {
            const crumbs = [{
              display: 'United States',
              to: 'directory/us',
            }];

            const {regions = []} = countryThunk.data;
            const {regionsBySearch} = this.state;
            const regionsToRender = regionsBySearch.length > 0
              ? regionsBySearch
              : regions;

            return (
              <>
                <Breadcrumbs crumbs={crumbs} />
                <CountryComponent
                  country={countryThunk.data}
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

const mapStateToProps = (store: {country: ts.thunk<ts.country>}) => ({
  countryThunk: store.country,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getCountry: (params: ts.directoryParams) => dispatch(getCountry(params)),
});

const Country = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountryContainer);

export default Country;
