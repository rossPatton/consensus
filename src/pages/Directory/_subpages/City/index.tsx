import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import {getCity, getCountry, getRegion} from '../../../../redux';
import {slugify } from '../../../../utils';
import {tProps, tStore} from './_types';

export class CityContainer extends PureComponent<tProps> {
  constructor(props: tProps) {
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
        <h2 className="mB2 fs3">
          Organizations in {city.name}
        </h2>
        <ul className="fx fxWrap">
          {city.orgs && city.orgs.map((org: tOrg, i) => (
            <li
              key={i}
              className="col p3 brdA1 br8 mB3 mL1 mR1"
              style={{width: '32%', maxWidth: '32%'}}>
              <div className="fs6 lh1 mB2">
                {org.category}
              </div>
              <Link
                className="dBl lh1 mB3 fs3"
                to={`${match.url}/${slugify(org.name)}/overview`}>
                {org.name}
              </Link>
              <div className="fs6 lh1">
                {org.membershipTotal} members
              </div>
            </li>
          ))}
        </ul>
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
