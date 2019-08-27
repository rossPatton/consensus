import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {Breadcrumbs, GenericLoader, Helmet} from '../../../../components';
import {getCity, getCountry, getRegion} from '../../../../redux';
import {slugify } from '../../../../utils';
import {tContainerProps, tStore} from './_types';
import {CityComponent} from './Component';

export class CityContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getCountry(props.match.params);
    props.getRegion(props.match.params);
    props.getCity(props.match.params);
  }

  render() {
    const {city, country, isLoading, match, region} = this.props;

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
              to: country.code,
            }, {
              display: region.name,
              to: `${country.code}/${region.code}`,
            }, {
              display: city.name,
              to: `${country.code}/${region.code}/${slugify(city.name)}`,
            }];

            return (
              <>
                <Breadcrumbs crumbs={crumbs} />
                <CityComponent
                  city={city}
                  country={country}
                  match={match}
                  region={region}
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
  getCity: (params: tLocationParams) => dispatch(getCity(params)),
  getCountry: (params: tLocationParams) => dispatch(getCountry(params)),
  getRegion: (params: tLocationParams) => dispatch(getRegion(params)),
});

export const City = connect(
  mapStateToProps,
  mapDispatchToProps
)(CityContainer);
