import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import { getCity, getCountry, getRegion } from '../../../../redux';
import { slugify } from '../../../../utils';

export class CityContainer extends PureComponent<any> {
  constructor(props: any) {
    super(props);
    if (!props.country.name) props.getCountry(props.match.params);
    if (!props.region.name) props.getRegion(props.match.params);
    props.getCity(props.match.params);
  }

  render() {
    const {city, match} = this.props;
    return (
      <>
        <h1 className="mB3">
          {city.name}
        </h1>
        <ul className="fx fxWrap">
          {city.orgs.map((org: any, i: number) => (
            <li
              key={i}
              className="col"
              style={{width: '32%', maxWidth: '32%'}}>
              <Link
                to={`${match.url}/${slugify(org.orgName)}/overview`}
                className="dBl p3 brdA1 br8 mB3 mL1 mR1 hvrBgGrey1 trans1">
                {org.orgName}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isLoading: state.city.isLoading,
  city: state.city.data,
  country: state.country.data,
  region: state.region.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getCity: (params: any) => dispatch(getCity(params)),
  getCountry: (params: any) => dispatch(getCountry(params)),
  getRegion: (params: any) => dispatch(getRegion(params)),
});

export const City = connect(
  mapStateToProps,
  mapDispatchToProps
)(CityContainer);
