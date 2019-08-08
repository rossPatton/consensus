import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { tProps } from './_types';

const ScrollToTopComponent = (props: tProps) => {
  const { children, location: { pathname } } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
};

export const ScrollToTop = withRouter(ScrollToTopComponent);
