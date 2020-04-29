import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {Breadcrumbs, Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader} from '~app/containers';
import {getCity, getRegion} from '~app/redux';
import {fuzzFilterList, slugify} from '~app/utils';

import {tContainerProps, tState, tStore} from './_types';
import {CityComponent} from './Component';

class CityContainer extends PureComponent<tContainerProps, tState> {
  state = {
    category: '' as ts.category,
    groupsBySearch: [] as ts.group[],
  };

  constructor(props: tContainerProps) {
    super(props);
    const {match: {params}} = props;
    props.getCity(params);
    props.getRegion({
      countryCode: params.countryCode,
      regionCode: params.regionCode,
    });
  }

  // Re-run the filter whenever the list array or filter text changes:
  filterByCategory = (group: ts.group[]) => {
    if (this.state.category === '') return group;
    return group.filter(group => group.category === this.state.category);
  };

  onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    this.setState({
      category: ev.currentTarget.value as ts.category,
    });
  }

  onSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    this.setState({
      groupsBySearch: fuzzFilterList({
        input: this.props.cityThunk.data.groups,
        search: ev.currentTarget.value,
      }),
    });
  }

  render() {
    const {cityThunk, regionThunk} = this.props;

    return (
      <ErrorBoundary status={cityThunk?.error?.status}>
        <Helmet
          canonical={`/us/${regionThunk.data.code}/${cityThunk.data.name}`}
          title="Consensus Directory: Groups by City"
          meta={[
            { name: 'description', content: 'Search for local groups to join in your city!' },
            { name: 'keywords', content: 'directory,search,city' },
          ]}
        />
        <GenericLoader
          isLoading={cityThunk.isLoading}
          render={() => {
            const city = cityThunk.data;
            const {groupsBySearch} = this.state;
            const groupsToRender = groupsBySearch.length > 0
              ? groupsBySearch
              : city.groups;

            return (
              <>
                <GenericLoader
                  isLoading={regionThunk.isLoading}
                  render={() => {
                    const region = regionThunk.data;
                    const crumbs = [{
                      display: 'United States',
                      to: 'directory/us',
                    }, {
                      display: region.name,
                      to: `directory/us/${region.code}`,
                    }, {
                      display: city.name,
                      to: `directory/us/${region.code}/${slugify(city.name)}`,
                    }];

                    return <Breadcrumbs crumbs={crumbs} />;
                  }}
                />
                <CityComponent
                  category={this.state.category}
                  city={city}
                  match={this.props.match}
                  onChange={this.onChange}
                  onSearch={this.onSearch}
                  groupsToRender={this.filterByCategory(groupsToRender)}
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
  cityThunk: store.city,
  regionThunk: store.region,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getCity: (params: ts.directoryParams) => dispatch(getCity(params)),
  getRegion: (params: ts.directoryParams) => dispatch(getRegion(params)),
});

const City = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CityContainer);

export default City;
