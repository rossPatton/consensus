declare module 'react-add-to-calendar-hoc' {
  import * as React from 'react';
  export interface Props {
    className?: string,
    event: Partial<ts.meeting>,
  };

  let Component: React.FunctionComponent<Props>;
  export default Component;
};
