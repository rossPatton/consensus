import React, { memo } from 'react';
import { Helmet } from '../../../../components';

import { tComponentProps } from './_types';
import { canonical, description, keywords, title } from './_constants';

export const AdminEventComponent = memo((props: tComponentProps) => (
  <>
    <Helmet
      canonical={canonical}
      title={title}
      meta={[
        { name: 'description', content: description },
        { name: 'keywords', content: keywords },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ]}
    />
    <form className="contain pT4" onSubmit={props.login}>
      <fieldset>
        <legend className="mB3">
          <h2>Create a new Event</h2>
        </legend>
        <h3>Event Title</h3>
        <input
          className="mB3 row"
          placeholder="Your Event Title Here"
          value={props.title}
          onChange={props.updateTitle}
        />
        <h3>Tell Us About Your Event</h3>
        <textarea
          rows={5}
          className="mB3 row"
          placeholder="Event Description Here"
          value={props.description}
          onChange={props.updateDescription}
        />
        <h3>Featured Image</h3>
        <div
          className="br8 brdA1 bsDashed brdW3 mB3 p5 fx fxdCol aiCtr jcCtr"
          style={{maxWidth: '760px'}}>
          <button className="bgWhite p3 hvrBgGrey1 trans1 mB2">
            Upload Your Image
          </button>
          <small>At least 300x300</small>
        </div>
        <h3>Where is your event happening?</h3>
        <input
          results={3}
          spellCheck
          className="mB3 row"
          type="search"
          placeholder="Your Event Location Here"
          value={props.location}
          onChange={props.updateLocation}
        />
        <div className="fx mB3">
          <div className="mR4">
            <h3>When is the Event?</h3>
            <input
              type="date"
              className="mR2"
              value="2019-09-03"
              placeholder="Event Date Here"
              onChange={props.updateDate}
            />
            <input
              type="time"
              placeholder="Event Time Here"
              value="19:00"
              onChange={props.updateDate}
            />
          </div>
          <div>
            <h3>How long is it?</h3>
            <select
              placeholder="Event Date Here"
              value={props.duration}
              onBlur={props.updateDuration}>
              <option value="1hr">1 hour</option>
              <option value="2hr">2 hours</option>
              <option value="3hr">3 hours</option>
              <option value="custom">Set an end time</option>
            </select>
          </div>
        </div>
      </fieldset>
    </form>
    <div className="brdT1 pT4 pB4 mT3 fx aiCtr">
      <div className="contain">
        <button className="p3 mR2 hvrBgGrey1 trans1">
          + Publish Event
        </button>
        <button className="p3 mR2 hvrBgGrey1 trans1">
          Preview Event
        </button>
        <button className="p3 hvrBgGrey1 trans1">
          Save as Draft
        </button>
      </div>
    </div>
  </>
));
