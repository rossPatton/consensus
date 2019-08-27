import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

// import {Redirect} from 'react-router-dom';
import {Breadcrumbs, GenericLoader, Helmet} from '../../../../components';
import {getCountry} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {CountryComponent} from './Component';

export class CountryContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getCountry(props.match.params);
  }

  render() {
    const {country, isLoading, match} = this.props;

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
            }];

            return (
              <>
                <Breadcrumbs crumbs={crumbs} />
                <CountryComponent
                  country={country}
                  match={match}
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
  country: store.country.data,
  isLoading: store.country.isLoading,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getCountry: (params: tDirectoryParams) => dispatch(getCountry(params)),
});

export const Country = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryContainer);
