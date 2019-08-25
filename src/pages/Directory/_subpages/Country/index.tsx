import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import { getCountry } from '../../../../redux';

export class CountryContainer extends PureComponent<any> {
  constructor(props: any) {
    super(props);
    props.getCountry(props.match.params);
  }

  render() {
    const {country, match} = this.props;
    return (
      <>
        <h1 className="mB3">
          {country.name}
        </h1>
        <ul className="fx fxWrap">
          {country.regions.map((region: any) => (
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

const mapStateToProps = (state: any) => ({
  isLoading: state.country.isLoading,
  country: state.country.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getCountry: (params: any) => dispatch(getCountry(params)),
});

export const Country = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryContainer);
