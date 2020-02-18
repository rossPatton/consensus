import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {categories} from '../../constants';
import {tComponentProps} from './_types';

export const HomeComponent = memo((props: tComponentProps) => (
  <header className="pT5 pB5">
    <div className="contain taCtr">
      <h1 className="mB3 pB1">
        Consensus is an events platform<br />for activists and community groups.
      </h1>
      {/* <h2 className="mB3">
          A platform for community groups, organizers, unions, activists, and anyone seeking an ethical, private platform to organize their peers.
        </h2> */}
      <Link
        className="br4 brdA1 dInBl p2 fs5 fw600 noUnderline mB4"
        to={props.isLoading
          ? '/directory/us/'
          : `/directory/us/${props.geo.state}/${props.geo.handle}`}>
            Join a group {props.isLoading
          ? 'near you'
          : `in ${props.geo.city}`}
      </Link>
      <div className="p4">
        <h2 className="fs4 mB2">Browse By Category</h2>
        <ul className="fx jcCtr">
          {categories.map((cat, i) => (
            <li
              key={i}
              className="mL2 mR2"
              style={{maxWidth: '150px', minWidth: '150px'}}>
              <div className="square br8 bgGrey3" />
              {cat.display}
            </li>
          ))}
        </ul>
      </div>
      <div className="p4">
        <h2 className="fs4 mB3">Upcoming Meetings</h2>
      </div>
    </div>
  </header>
));
