import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Events, PlaceholderImage} from '../../components';
import {categories} from '../../constants';
import {GenericLoader} from '../../containers';
import {tProps} from './_types';

export const HomeComponent = memo((props: tProps) => (
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
      <GenericLoader
        showLoader={false}
        isLoading={props.eventsByLocation.isLoading}
        render={() => (
          <div className="p4">
            <h2 className="fs4 mB3">Upcoming Meetings in {props.geo.city}</h2>
            <Events
              horizontal
              showOrgName
              events={props.eventsByLocation.data.slice(0, 4)}
            />
          </div>
        )}
      />
      <div className="p4">
        <h2 className="fs4 mB2">Or Browse by Category</h2>
        <ul className="fx jcCtr">
          {categories.map((cat, i) => (
            <li
              key={i}
              className="fs6 fw600 lh1 mL2 mR2">
              <Link to={`/categories/${cat.slug}`}>
                <div className="mB2">
                  <PlaceholderImage
                    height={100}
                    seed={i}
                    width={200}
                  />
                </div>
                {cat.display}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </header>
));
