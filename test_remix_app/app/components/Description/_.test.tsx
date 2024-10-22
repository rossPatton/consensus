import React from 'react';
import {create} from 'react-test-renderer';

import Description from '.';

describe('components/Description', () => {
  it('renders null when no description prop passed in', () => {
    const component = create(<Description />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders null when bad description passed in', () => {
    const component = create(<Description description="" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders as expected', () => {
    const component = create((
      <Description
        description="testing rendering description. test. testing."
      />
    ));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('renders full list on click', () => {
  //   const component = create((
  //     <Description
  //       description={`
  //         testing rendering description. test. testing.
  //         another line
  //         a line down here after the break
  //       `}
  //     />
  //   )).root;
  //   // act(() => {
  //   //   const button = component.findByType('button')
  //   //   button.props.onClick();
  //   // });

  //   const button = component.findByType('button')
  //   button.props.onClick();

  //   expect(component).toMatchSnapshot();
  //   expect(component.findAllByType('p')).toHaveLength(3);
  // });
});
