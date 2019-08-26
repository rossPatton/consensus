import React, { memo } from 'react';
import { Breadcrumbs } from '../../../../components';
import { tComponentProps } from './_types';

export const OrganizationHeaderComponent = memo((props: tComponentProps) => (
  <header className="bgGrey2 pT3 pB3">
    <div className="contain">
      <Breadcrumbs />
      <h1>
        {props.org.name}
      </h1>
    </div>
  </header>
));
