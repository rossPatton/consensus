import React, { useEffect, useRef, useState } from 'react';

// import { tProps } from './_types';

export const OutsideClick = (props: any) => {
  const node: React.MutableRefObject<any> = useRef();
  const [isOutside, setOutside] = useState(false);

  const handleClick = (ev: MouseEvent) => {
    if (node.current.contains(ev.target)) {
      setOutside(false);
      // inside click
      return;
    }

    // outside click
    props.handleChange(false);
    setOutside(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  return (
    <div ref={node}>
      {props.render(isOutside)}
    </div>
  );
};