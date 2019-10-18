import React, { memo } from 'react';
import { Helmet as ReactHelmetAsync } from 'react-helmet-async';

import { LINK_TAGS, META_TAGS } from './_constants';
import { tProps } from './_types';

// helmet renders what was passed in last.for SSR, we only want to call helmet once
// using this component, we basically merge route specific meta with default meta
// so all default meta gets included + route specific meta like title, etc
const Helmet = memo((props: tProps) => {
  const { link = [], meta = [], canonical = '' } = props;
  const canonicalUrl = `https://www.consensus.com${canonical}`;
  const linkCanonical: tLinkProps = { rel: 'canonical', href: canonicalUrl };
  const metaCanonical: tMetaProps = { property: 'og:url', content: canonicalUrl };

  const links = [...LINK_TAGS, ...link, linkCanonical];
  const metas = [...META_TAGS, ...meta, metaCanonical];

  return (
    <ReactHelmetAsync
      link={links}
      meta={metas}
      title={props.title}
    />
  );
});

export default Helmet;
