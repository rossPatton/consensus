import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {Breadcrumbs, GenericLoader, Helmet} from '../../../../components';
import {Paginate} from '../../../../containers';
import {getCity, getCountry, getRegion} from '../../../../redux';
import {fuzzFilterList, slugify} from '../../../../utils';
import {tContainerProps, tState, tStore} from './_types';
import {CityComponent} from './Component';

class CityContainer extends PureComponent<tContainerProps, tState> {
  state = {
    category: '',
    orgsBySearch: [],
  };

  constructor(props: tContainerProps) {
    super(props);
    props.getCountry(props.match.params);
    props.getRegion(props.match.params);
    props.getCity(props.match.params);
  }

  // Re-run the filter whenever the list array or filter text changes:
  filterByCategory = (orgs: tOrg[]) => {
    if (this.state.category === '') return orgs;
    return orgs.filter(org => org.category === this.state.category);
  };

  onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    this.setState({
      category: ev.currentTarget.value,
    });
  }

  onSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    this.setState({
      orgsBySearch: fuzzFilterList({
        input: this.props.city.orgs,
        search: ev.currentTarget.value,
      }),
    });
  }

  render() {
    const {orgsBySearch} = this.state;
    const {city, country, isLoading, match, region} = this.props;
    const categories = city.orgs.map(org => org.category);
    const orgsToRender = orgsBySearch.length > 0 ? orgsBySearch : city.orgs;

    return (
      <>
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
              display: country.name,
              to: `directory/${country.code}`,
            }, {
              display: region.name,
              to: `directory/${country.code}/${region.code}`,
            }, {
              display: city.name,
              to: `directory/${country.code}/${region.code}/${slugify(city.name)}`,
            }];

            return (
              <>
                <Breadcrumbs crumbs={crumbs} />
                <Paginate
                  count={9}
                  items={this.filterByCategory(orgsToRender)}
                  match={this.props.match}
                  render={(itemsToRender: tOrg[]) => (
                    <CityComponent
                      categories={categories}
                      city={city}
                      country={country}
                      match={match}
                      onChange={this.onChange}
                      onSearch={this.onSearch}
                      orgsToRender={itemsToRender}
                      region={region}
                    />
                  )}
                />
              </>
            );
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.city.isLoading,
  city: store.city.data,
  country: store.country.data,
  region: store.region.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getCity: (params: tDirectoryParams) => dispatch(getCity(params)),
  getCountry: (params: tDirectoryParams) => dispatch(getCountry(params)),
  getRegion: (params: tDirectoryParams) => dispatch(getRegion(params)),
});

const City = connect(
  mapStateToProps,
  mapDispatchToProps
)(CityContainer);

export default City;
