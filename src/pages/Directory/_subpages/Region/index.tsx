import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import { getCountry, getRegion } from '../../../../redux';
import { slugify } from '../../../../utils';

export class RegionContainer extends PureComponent<any> {
  constructor(props: any) {
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
        <ul className="fx fxWrap">
          {region.cities.map((city: any, i: number) => (
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

const mapStateToProps = (state: any) => ({
  isLoading: state.region.isLoading,
  country: state.country.data,
  region: state.region.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getCountry: (params: any) => dispatch(getCountry(params)),
  getRegion: (params: any) => dispatch(getRegion(params)),
});

export const Region = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionContainer);
