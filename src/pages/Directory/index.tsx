import React, { PureComponent } from 'react';

import { Helmet } from '../../components';
import { tProps } from './_types';
import { DirectoryComponent } from './Component';

// TODO potentially move up redux logic to this container
export class DirectoryContainer extends PureComponent<tProps> {
  render() {
    return (
      <>
        <Helmet
          canonical=""
          title=""
          meta={[
            { name: 'description', content: '' },
            { name: 'keywords', content: '' },
            { property: 'og:title', content: '' },
            { property: 'og:description', content: '' },
          ]}
        />
        <DirectoryComponent {...this.props} />
      </>
    );
  }
}

export const Directory = DirectoryContainer;

