import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import {getCountry, getRegion} from '../../../../redux';
import {slugify} from '../../../../utils';
import {tProps, tStore} from './_types';

export class RegionContainer extends PureComponent<tProps> {
  constructor(props: tProps) {
    super(props);
    if (!props.country.name) props.getCountry(props.match.params);
    props.getRegion(props.match.params);
  }

  render() {
    const {region, match} = this.props;
    return (
      <>
        <h1 className="mB3">
          {region.name}
        </h1>
        <h2 className="mB2 fs3">
          Cities in {region.name}
        </h2>
        <ul className="fx fxWrap">
          {region.cities && region.cities.map((city: tCity, i) => (
            <li
              key={i}
              className="col"
              style={{width: '32%', maxWidth: '32%'}}>
              <Link
                to={`${match.url}/${slugify(city.name)}`}
                className="dBl p3 brdA1 br8 mB3 mL1 mR1 hvrBgGrey1 trans1">
                {city.name}
              </Link>
            </li>
          ))}
        </ul>
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
