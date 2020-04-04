import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {Breadcrumbs, Helmet} from '../../../../components';
import {ErrorBoundary, GenericLoader} from '../../../../containers';
import {getCity, getRegion} from '../../../../redux';
import {fuzzFilterList, slugify} from '../../../../utils';
import {tContainerProps, tState, tStore} from './_types';
import {CityComponent} from './Component';

class CityContainer extends PureComponent<tContainerProps, tState> {
  state = {
    category: '' as tCategory,
    orgsBySearch: [] as tGroup[],
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
  filterByCategory = (orgs: tGroup[]) => {
    if (this.state.category === '') return orgs;
    return orgs.filter(org => org.category === this.state.category);
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
      orgsBySearch: fuzzFilterList({
        input: this.props.city.data.orgs,
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
            const {orgsBySearch} = this.state;
            const orgsToRender = orgsBySearch.length > 0
              ? orgsBySearch
              : this.props.city.data.orgs;

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
                  city={this.props.city.data}
                  match={this.props.match}
                  onChange={this.onChange}
                  onSearch={this.onSearch}
                  orgsToRender={this.filterByCategory(orgsToRender)}
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
