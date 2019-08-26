import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BreadcrumbsComponent } from './Component';
import { tProps } from './_types';

export class BreadcrumbsContainer extends PureComponent<tProps> {
  render() {
    return (
      <BreadcrumbsComponent
        country={this.props.country}
        region={this.props.region}
        city={this.props.city}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  country: state.country.data,
  region: state.region.data,
  city: state.city.data,
});

export const Breadcrumbs = connect(mapStateToProps)(BreadcrumbsContainer);
