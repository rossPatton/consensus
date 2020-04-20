import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Categories, Events} from '~app/components';
import {GenericLoader} from '~app/containers';

import {tProps} from './_types';

export const HomeComponent = memo((props: tProps) => (
  <div className="text-center">
    <h1 className="mb-2">
      Consensus is an events platform for activists and community groups.
    </h1>
    <Link
      className="btn p-2 hover:bg-gray-3 mb-4"
      to={!props.geoThunk.fetched
        ? '/directory/us/'
        : `/directory/us/${props.geoThunk.data.regionCode}/${props.geoThunk.data.handle}`
      }>
      Join a group {!props.geoThunk.fetched
        ? 'near you'
        : `in ${props.geoThunk.data.city}`}
    </Link>
    <GenericLoader
      showLoader={false}
      isLoading={props.eventsByLocationThunk.isLoading}
      render={() => props.eventsByLocationThunk.data.length > 0
        && (
          <div className="mb-4">
            <h2 className="text-3 mb-2">
              Upcoming Meetings in {props.geoThunk.data.city || props.session.profile.cityId}
            </h2>
            <Events
              horizontal
              showOrgName
              events={props.eventsByLocationThunk.data.slice(0, 4)}
            />
          </div>
        )}
    />
    <h2 className="text-3 mb-2">Or browse by category</h2>
    <Categories />
  </div>
));
