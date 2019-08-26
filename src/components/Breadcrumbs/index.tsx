import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { GenericLoader } from '../../components';
import { BreadcrumbsComponent } from './Component';
import { tContainerProps, tStore } from './_types';

export class BreadcrumbsContainer extends PureComponent<tContainerProps> {
  render() {
    return (
      <GenericLoader
        isLoading={this.props.isLoading}
        render={() => (
          <BreadcrumbsComponent
            country={this.props.country}
            region={this.props.region}
            city={this.props.city}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.country.isLoading
    && store.region.isLoading
    && store.city.isLoading,
  country: store.country.data,
  region: store.region.data,
  city: store.city.data,
});

export const Breadcrumbs = connect(mapStateToProps)(BreadcrumbsContainer);
