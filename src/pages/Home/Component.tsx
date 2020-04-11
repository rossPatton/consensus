import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Categories, Events} from '../../components';
import {GenericLoader} from '../../containers';
import {tComponentProps} from './_types';

export const HomeComponent = memo((props: tComponentProps) => (
  <div className="text-center">
    <h1 className="mb-2">
      Consensus is an events platform for activists and community groups.
    </h1>
    <Link
      className="btn p-2 hover:bg-gray-3 mb-4"
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
          <div className="mb-4">
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
    <h2 className="text-3 mb-2">Or browse by category</h2>
    <Categories />
  </div>
));
