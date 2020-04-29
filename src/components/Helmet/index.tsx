import _ from 'lodash';
import React, { memo } from 'react';
import { Helmet as ReactHelmetAsync } from 'react-helmet-async';

import { LINK_TAGS, META_TAGS } from './_constants';
import { tProps } from './_types';

/**
 * this component merges route specific meta with default site-wide meta
 */
const Helmet = memo((props: tProps) => {
  const { link = [], meta = [], canonical = '' } = props;
  const canonicalUrl = `https://www.consensus.com${canonical}`;
  const linkCanonical: tLinkProps = { rel: 'canonical', href: canonicalUrl };
  const metaCanonical: tMetaProps = { property: 'og:url', content: canonicalUrl };

  // for convenience, duplicate title and description for og title and description
  const ogTitleMeta = {
    property: 'og:title',
    content: props.title,
  };
  const description = _.find(meta, m => m.name === 'description');
  const ogDescriptionMeta = description
    ? {
      property: 'og:description',
      content: description?.content,
    }
    : {};

  const links = [...LINK_TAGS, ...link, linkCanonical];
  const metas = [
    ...META_TAGS,
    ...meta,
    ogTitleMeta,
    ogDescriptionMeta,
    metaCanonical,
  ];

  return (
    <ReactHelmetAsync
      link={links}
      meta={metas}
      title={props.title}
    />
  );
});

export default Helmet;
