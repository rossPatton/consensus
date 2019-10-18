import React, {Fragment, memo} from 'react';
import {Link} from 'react-router-dom';

import {tProps} from './_types';

const Breadcrumbs = memo((props: tProps) => {
  if (!props.crumbs) return null;
  if (!(props.crumbs instanceof Array)) return null;

  return (
    <ul className="fs6 fw600 mB2 lh1 lsNone fx fxWrap brdB1 mB3 pB3">
      {props.crumbs.map((crumb: tCrumb, i) => {
        const isLastItem = i === props.crumbs.length - 1;
        const renderLink = !isLastItem && crumb.to;

        return (
          <Fragment key={i}>
            <li className="mR1">
              {!renderLink && crumb.display}
              {renderLink && (
                <Link to={`/${crumb.to}`}>
                  {crumb.display}
                </Link>
              )}
            </li>
            {renderLink && (
              <li className="mHide mR1">/</li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
});

export default Breadcrumbs;
