import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {Breadcrumbs, Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader} from '~app/containers';
import {getRegion} from '~app/redux';
import {fuzzFilterList} from '~app/utils';

import {tContainerProps} from './_types';
import {RegionComponent} from './Component';

class RegionContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getRegion(props.match.params);
  }

  state = {
    citiesBySearch: [] as ts.city[],
  };

  onChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const {cities = []} = this.props.regionThunk.data;

    const citiesBySearch = await fuzzFilterList({
      input: cities,
      search: ev.currentTarget.value,
    });

    this.setState({
      citiesBySearch,
    });
  }

  render() {
    const {match, regionThunk} = this.props;

    return (
      <ErrorBoundary status={regionThunk?.error?.status}>
        <Helmet
          canonical={`/us/${regionThunk.data.code}`}
          title="Consensus Directory: Cities by Region"
          meta={[
            { name: 'description', content: "Search for cities by region or state. Find your city and see what's happening!" },
            { name: 'keywords', content: 'directory,search,region' },
          ]}
        />
        <GenericLoader
          isLoading={regionThunk.isLoading}
          render={() => {
            const crumbs = [{
              display: 'United States',
              to: 'directory/us',
            }, {
              display: regionThunk.data.name,
              to: `directory/us/${regionThunk.data.code}`,
            }];

            const {cities = []} = regionThunk.data;
            const {citiesBySearch} = this.state;
            const citiesToRender = citiesBySearch.length > 0
              ? citiesBySearch
              : cities;

            return (
              <>
                <Breadcrumbs crumbs={crumbs} />
                <RegionComponent
                  citiesToRender={citiesToRender}
                  match={match}
                  onChange={this.onChange}
                  region={regionThunk.data}
                />
              </>
            );
          }}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: {region: ts.thunk<ts.region>}) => ({
  regionThunk: store.region,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getRegion: (params: ts.directoryParams) => dispatch(getRegion(params)),
});

const Region = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegionContainer);

export default Region;
