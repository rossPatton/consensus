import _ from 'lodash';
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
    category: '' as tCategory,
    groupsBySearch: [] as tGroup[],
  };

  constructor(props: tContainerProps) {
    super(props);
    const {match: {params}} = props;
    props.getRegion({
      countryCode: params.countryCode,
      regionCode: params.regionCode,
    });
    props.getCity(params);
  }

  // Re-run the filter whenever the list array or filter text changes:
  filterByCategory = (group: tGroup[]) => {
    if (this.state.category === '') return group;
    return group.filter(group => group.category === this.state.category);
  };

  onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    this.setState({
      category: ev.currentTarget.value as tCategory,
    });
  }

  onSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    this.setState({
      groupsBySearch: fuzzFilterList({
        input: this.props.city.data.group,
        search: ev.currentTarget.value,
      }),
    });
  }

  render() {
    return (
      <ErrorBoundary status={_.get(this.props.city, 'error.status', 200)}>
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
          isLoading={this.props.isCityLoading}
          render={() => {
            const {groupsBySearch} = this.state;
            const groupsToRender = groupsBySearch.length > 0
              ? groupsBySearch
              : this.props.city.data.group;

            return (
              <>
                <GenericLoader
                  isLoading={this.props.isRegionLoading}
                  render={() => {
                    const {city, region} = this.props;

                    const crumbs = [{
                      display: 'United States',
                      to: 'directory/us',
                    }, {
                      display: region.name,
                      to: `directory/us/${region.code}`,
                    }, {
                      display: city.data.name,
                      to: `directory/us/${region.code}/${slugify(city.data.name)}`,
                    }];

                    return <Breadcrumbs crumbs={crumbs} />;
                  }}
                />
                <CityComponent
                  category={this.state.category}
                  city={this.props.city.data}
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
  isCityLoading: store.city.isLoading,
  isRegionLoading: store.region.isLoading,
  city: store.city,
  region: store.region.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getCity: (params: tDirectoryParams) => dispatch(getCity(params)),
  getRegion: (params: tDirectoryParams) => dispatch(getRegion(params)),
});

const City = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CityContainer);

export default City;
