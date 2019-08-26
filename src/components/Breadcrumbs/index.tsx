import React, {Fragment, memo} from 'react';
import {Link} from 'react-router-dom';
import {tProps} from './_types';

export const Breadcrumbs = memo((props: tProps) => {
  const {crumbs = []} = props;

  return (
    <ul className="fs6 fw600 mB2 lh1 lsNone fx fxWrap brdB1 mB3 pB3">
      {crumbs.map((crumb: tCrumb, i) => {
        const isLastItem = i === crumbs.length - 1;
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
