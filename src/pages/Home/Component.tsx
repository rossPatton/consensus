import React, {memo} from 'react';

import {Categories, Search} from '~app/components';

import {tProps} from './_types';

export const HomeComponent = memo((props: tProps) => {
  const {city} = props.geoThunk.data;
  return (
    <>
      <div className="flex flex-col items-center mb-3 text-center">
        <h1 className="text-2 d:text-1 mb-2 text-gray-5 leading-tight d:max-w-1/2">
          Consensus is an independent meetings platform for leftist activists and local community groups.
        </h1>
        <div className="w-1/3">
          <Search
            className="w-full pl-3"
            placeholder={`Search groups ${city ? `in ${city}` : ''}`}
          />
        </div>
      </div>
      <Categories />
    </>
  );
});

// @TODO re-implement once we have enough activity to justify it
/* <GenericLoader
      showLoader={false}
      isLoading={props.meetingsByLocationThunk.isLoading}
      render={() => props.meetingsByLocationThunk.data.length > 0
        && (
          <div className="mb-4">
            <h2 className="text-3 mb-2">
              Upcoming Meetings in {props.geoThunk.data.city || props.session.profile.cityId}
            </h2>
            <Meetings
              horizontal
              showOrgName
              meetings={props.meetingsByLocationThunk.data.slice(0, 4)}
            />
          </div>
        )}
    /> */
