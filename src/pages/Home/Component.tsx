import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Events, PlaceholderImage} from '../../components';
import {categories} from '../../constants';
import {GenericLoader} from '../../containers';
import {tComponentProps} from './_types';

export const HomeComponent = memo((props: tComponentProps) => (
  <header className="pt-5 pb-5">
    <div className="contain text-center">
      <h1 className="mb-3 pb-1">
        Consensus is an events platform<br />for activists and community groups.
      </h1>
      {/* <h2 className="mb-3">
          A platform for community groups, organizers, unions, activists, and anyone seeking an ethical, private platform to organize their peers.
        </h2> */}
      <Link
        className="br4 brdA1 dInBl p-2 fs5 text-bold no-underline mb-4"
        to={props.isLoading
          ? '/directory/us/'
          : `/directory/us/${props.geo.region}/${props.geo.handle}`}>
            Join a group {props.isLoading
          ? 'near you'
          : `in ${props.geo.city}`}
      </Link>
      <GenericLoader
        showLoader={false}
        isLoading={props.eventsByLocationThunk.isLoading}
        render={() => (
          <div className="p4">
            <h2 className="fs4 mb-3">Upcoming Meetings in {props.geo.city || props.session.profile.cityId}</h2>
            <Events
              horizontal
              showOrgName
              events={props.eventsByLocationThunk.data.slice(0, 4)}
            />
          </div>
        )}
      />
      <div className="p4">
        <h2 className="fs4 mb-2">Or Browse by Category</h2>
        <ul className="flex flex-col d:flex-row jcCtr">
          {categories.map((cat, i) => (
            <li
              key={i}
              className="text-sm text-bold leading-none mL2 mr-2">
              <Link to={`/categories/${cat.slug}`}>
                <div className="mb-2">
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
