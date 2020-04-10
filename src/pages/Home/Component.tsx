import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Events, PlaceholderImage} from '../../components';
import {categories} from '../../constants';
import {GenericLoader} from '../../containers';
import {tComponentProps} from './_types';

export const HomeComponent = memo((props: tComponentProps) => (
  <div className="text-center">
    <h1 className="mb-2">
      Consensus is an events platform<br />for activists and community groups.
    </h1>
    <Link
      className="btn p-2 hover:bg-gray-4 mb-4"
      to={props.isLoading
        ? '/directory/us/'
        : `/directory/us/${props.geo.regionCode}/${props.geo.handle}`
      }>
      Join a group {props.isLoading ? 'near you' : `in ${props.geo.city}`}
    </Link>
    <GenericLoader
      showLoader={false}
      isLoading={props.eventsByLocationThunk.isLoading}
      render={() => props.eventsByLocationThunk.data.length > 0
        && (
          <div className="mb-3">
            <h2 className="text-3 mb-2">
              Upcoming Meetings in {props.geo.city || props.session.profile.cityId}
            </h2>
            <Events
              horizontal
              showOrgName
              events={props.eventsByLocationThunk.data.slice(0, 4)}
            />
          </div>
        )}
    />
    <div className="pb-4">
      <h2 className="text-3 mb-2">Or browse by category</h2>
      <ul className="flex flex-col d:flex-row justify-center">
        {categories.map((cat, i) => (
          <li
            key={i}
            className="d:w-1/4 leading-none d:ml-1 d:mr-1 mb-3">
            <Link to={`/categories/${cat.slug}`}>
              <b className="block mb-2">
                <PlaceholderImage
                  height={100}
                  seed={i}
                  width={200}
                />
              </b>
              {cat.display}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
));
