import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import {getCountry} from '../../../../redux';
import {tProps, tStore} from './_types';

export class CountryContainer extends PureComponent<tProps> {
  constructor(props: tProps) {
    super(props);
    if (props.country.name) return;
    props.getCountry(props.match.params);
  }

  render() {
    const {country, match} = this.props;

    return (
      <>
        <h1 className="mB3">
          {country.name}
        </h1>
        <h2 className="mB2 fs3">
          Regions in {country.name}
        </h2>
        <ul className="fx fxWrap">
          {country.regions && country.regions.map((region: tRegion) => (
            <li
              key={region.name}
              className="col"
              style={{width: '32%', maxWidth: '32%'}}>
              <Link
                to={`${match.url}/${region.code.toLowerCase()}`}
                className="dBl p3 brdA1 br8 mB3 mL1 mR1 hvrBgGrey1 trans1">
                {region.name}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  country: store.country.data,
  isLoading: store.country.isLoading,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getCountry: (params: tLocationParams) => dispatch(getCountry(params)),
});

export const Country = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryContainer);
