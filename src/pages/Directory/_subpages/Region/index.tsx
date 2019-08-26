import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {Breadcrumbs, GenericLoader, Helmet} from '../../../../components';
import {getCountry, getRegion} from '../../../../redux';
import {RegionComponent} from './Component';
import {tContainerProps, tStore} from './_types';

export class RegionContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getCountry(props.match.params);
    props.getRegion(props.match.params);
  }

  render() {
    const {country, isLoading, match, region} = this.props;

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
            }];

            return (
              <>
                <Breadcrumbs crumbs={crumbs} />
                <RegionComponent
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
  isLoading: store.region.isLoading,
  country: store.country.data,
  region: store.region.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getCountry: (params: tLocationParams) => dispatch(getCountry(params)),
  getRegion: (params: tLocationParams) => dispatch(getRegion(params)),
});

export const Region = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionContainer);
