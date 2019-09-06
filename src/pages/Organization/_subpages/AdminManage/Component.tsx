import cx from 'classnames';
import _ from 'lodash';
import React, { memo } from 'react';

import { getDateNowAsISOStr } from '../../../../utils';
import { tComponentProps } from './_types';

export const AdminManageComponent = memo((props: tComponentProps) => (
  <form
    id="form"
    onSubmit={props.onSubmit}>
    <fieldset className="row">
      <legend className="mB3">
        <h2>Manage Your Organization</h2>
      </legend>
      <h3>Organization Name</h3>
      <input
        className="mB3 row"
        onChange={ev => props.updateState('name', ev)}
        placeholder="Your Organization Name Here"
        value={props.name}
      />
      <div className="brdT1 pT4 pB4 mT4 fx aiCtr">
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
    </fieldset>
  </form>
));
